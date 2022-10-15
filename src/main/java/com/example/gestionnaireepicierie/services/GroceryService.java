package com.example.gestionnaireepicierie.services;

import com.example.gestionnaireepicierie.controllers.payload.request.ArticleDto;
import com.example.gestionnaireepicierie.controllers.payload.request.GroceryDto;
import com.example.gestionnaireepicierie.controllers.payload.response.UserDto;
import com.example.gestionnaireepicierie.entities.Article;
import com.example.gestionnaireepicierie.entities.Grocery;
import com.example.gestionnaireepicierie.entities.User;
import com.example.gestionnaireepicierie.repositories.ArticleRepository;
import com.example.gestionnaireepicierie.repositories.GroceryRepository;
import com.example.gestionnaireepicierie.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Service
@AllArgsConstructor
public class GroceryService {

    private GroceryRepository groceryRepository;
    private UserRepository userRepository;
    private ArticleRepository articleRepository;

    public void addGrocery(GroceryDto dto) {
        Optional<User> owner = userRepository.findUserByEmail(dto.owner().email());
        List<Article> articleList = new ArrayList<>();

        for (ArticleDto article : dto.articles()) {
            Article articleInDb = articleRepository.findArticleByNameAndPrice(article.name(), article.price());
            List<String> articlesName = articleList.stream().map(Article::getName).toList();

            if (articleInDb != null && articlesName.contains(articleInDb.getName())) {
                throw new ResponseStatusException(HttpStatus.CONFLICT);
            }

            articleList.add(Objects.requireNonNullElseGet(
                    articleInDb,
                    () -> articleRepository.save(new Article(article.name(), article.price()))
            ));
        }

        if (owner.isPresent()) {
            Grocery grocery = new Grocery(dto.name(), owner.get(), articleList, dto.totalPrice(), dto.isCompleted());
            groceryRepository.save(grocery);
        }
    }

    public List<GroceryDto> getGroceriesByUser(String userEmail) {
        Optional<User> userOptional = userRepository.findUserByEmail(userEmail);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<Grocery> groceries = groceryRepository.getGroceriesByOwner(user);
            return groceries.stream().map(
                    grocery -> new GroceryDto(
                            grocery.getId(),
                            grocery.getName(),
                            new UserDto(
                                    grocery.getOwner().getName(),
                                    grocery.getOwner().getEmail()),
                            grocery.getArticles().stream().map(article -> new ArticleDto(
                                    article.getName(),
                                    article.getPrice())).toList(),
                            grocery.getTotalPrice(),
                            grocery.isCompleted()
                    )
            ).toList();

        } else {
            return null;
        }
    }

    @Transactional
    public void updateGrocery(GroceryDto dto) {
        Optional<Grocery> optionalGrocery = groceryRepository.getGroceryById(dto.id());

        if (optionalGrocery.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        Grocery grocery = optionalGrocery.get();

        groceryRepository.deleteGroceryById(grocery.getId());
        addGrocery(dto);
    }

    @Transactional
    public void deleteGrocery(Long id) {
        groceryRepository.deleteGroceryById(id);
    }
}
