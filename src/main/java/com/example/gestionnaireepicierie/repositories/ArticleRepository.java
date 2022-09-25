package com.example.gestionnaireepicierie.repositories;

import com.example.gestionnaireepicierie.entities.Article;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ArticleRepository extends CrudRepository<Article, Integer> {
    Article findArticleByNameAndPrice(String name, float price);
}
