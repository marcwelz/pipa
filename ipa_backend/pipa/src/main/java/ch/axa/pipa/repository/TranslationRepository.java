package ch.axa.pipa.repository;

import ch.axa.pipa.model.TranslationEntry;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TranslationRepository extends CrudRepository<TranslationEntry, Integer> {
}
