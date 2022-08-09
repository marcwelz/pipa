package ch.axa.pipa.service;

import ch.axa.pipa.model.TranslationEntry;
import ch.axa.pipa.repository.TranslationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class TranslationService {

    private final TranslationRepository repository;

    public Iterable<TranslationEntry> getAllTranslationEntries() {
        return repository.findAll();
    }

    public void createTranslationEntity(TranslationEntry entry) {
        repository.save(entry);
    }

    public TranslationEntry updateTranslationEntry(int id, TranslationEntry entry) {
        deleteTranslationEntry(id);
        return repository.save(entry);
    }

    public void deleteTranslationEntry(int textId) {
        repository.delete(Objects.requireNonNull(findById(textId)));
    }

    private TranslationEntry findById(int id) {
        Optional<TranslationEntry> entry = repository.findById(id);
        if(entry.isEmpty()) return null; //TODO error handeling
        return entry.get();
    }
}
