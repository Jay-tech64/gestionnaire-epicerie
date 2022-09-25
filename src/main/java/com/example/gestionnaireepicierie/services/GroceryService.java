package com.example.gestionnaireepicierie.services;

import com.example.gestionnaireepicierie.controllers.payload.request.ArticleDto;
import com.example.gestionnaireepicierie.controllers.payload.request.GroceryDto;
import com.example.gestionnaireepicierie.entities.Article;
import com.example.gestionnaireepicierie.entities.Grocery;
import com.example.gestionnaireepicierie.entities.User;
import com.example.gestionnaireepicierie.repositories.ArticleRepository;
import com.example.gestionnaireepicierie.repositories.GroceryRepository;
import com.example.gestionnaireepicierie.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class GroceryService {

    private GroceryRepository groceryRepository;
    private UserRepository userRepository;
    private ArticleRepository articleRepository;

    public void addGrocery(GroceryDto dto){
        Optional<User> owner = userRepository.findUserByEmail(dto.owner().email());
        List<Article> articleList = new ArrayList<>();

        for (ArticleDto article : dto.articles()) {
            Article articleInDb = articleRepository.findArticleByNameAndPrice(article.name(), article.price());
            articleList.add(Objects.requireNonNullElseGet(
                    articleInDb,
                    () -> articleRepository.save(new Article(article.name(), article.price()))
            ));
        }

        if (owner.isPresent()){
            Grocery grocery = new Grocery(dto.name(), owner.get(), articleList, dto.totalPrice());
            groceryRepository.save(grocery);
        }
    }
}
