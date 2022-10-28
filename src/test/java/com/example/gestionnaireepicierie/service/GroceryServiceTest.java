package com.example.gestionnaireepicierie.service;

import com.example.gestionnaireepicierie.controllers.payload.request.ArticleDto;
import com.example.gestionnaireepicierie.controllers.payload.request.GroceryDto;
import com.example.gestionnaireepicierie.controllers.payload.response.UserDto;
import com.example.gestionnaireepicierie.entities.Article;
import com.example.gestionnaireepicierie.repositories.ArticleRepository;
import com.example.gestionnaireepicierie.services.GroceryService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class GroceryServiceTest {

    @Mock
    ArticleRepository articleRepository;

    @InjectMocks
    GroceryService groceryService;

    @Test
    public void addGroceryHappyDay() {
        // Arrange
        Article article1 = new Article("Tomate", 1.99f);
        Article article2 = new Article("Patate", 3.99f);
        Article article3 = new Article("Pomme", 1.99f);
        ArticleDto mockArticle1 = new ArticleDto("Tomate", 1.99f);
        ArticleDto mockArticle2 = new ArticleDto("Patate", 3.99f);
        ArticleDto mockArticle3 = new ArticleDto("Pomme", 1.99f);
        UserDto mockUser = new UserDto("Jeremy", "jeremy@test.com");
        GroceryDto mockGrocery = new GroceryDto(
                1L, "IGA",
                mockUser,
                List.of(mockArticle1, mockArticle2, mockArticle3),
                7.97f,
                false);
        when(articleRepository.findArticleByNameAndPrice("Tomate", 1.99f)).thenReturn(article1);
        when(articleRepository.findArticleByNameAndPrice("Patate", 3.99f)).thenReturn(article2);
        when(articleRepository.findArticleByNameAndPrice("Pomme", 1.99f)).thenReturn(article3);

        // Act
        groceryService.addGrocery(mockGrocery);

        // Assert
        assertThat(mockGrocery.articles().size()).isEqualTo(3);
    }

    @Test
    public void addDuplicatesToGrocery() {
        // Arrange
        Article article = new Article("Carotte", 1.99f);
        ArticleDto mockArticle1 = new ArticleDto("Carotte", 1.99f);
        ArticleDto mockArticle2 = new ArticleDto("Carotte", 1.99f);
        UserDto mockUser = new UserDto("Jeremy", "jeremy@test.com");
        GroceryDto mockGrocery = new GroceryDto(
                1L, "IGA",
                mockUser,
                List.of(mockArticle1, mockArticle2),
                7.97f,
                false);
        when(articleRepository.findArticleByNameAndPrice(anyString(), anyFloat())).thenReturn(article);

        // Act & Assert
        assertThatThrownBy(() -> groceryService.addGrocery(mockGrocery))
                .isInstanceOf(ResponseStatusException.class)
                .extracting("status").isEqualTo(HttpStatus.CONFLICT);
    }
}
