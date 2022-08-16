package ch.axa.pipa.service;

import ch.axa.pipa.model.SearchTranslationEntry;
import ch.axa.pipa.model.TranslationEntry;
import ch.axa.pipa.repository.TranslationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;


@Service
@Slf4j
@RequiredArgsConstructor
public class TranslationService {

    private final TranslationRepository repository;

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public Iterable<TranslationEntry> getAllTranslationEntries() {
        return repository.findAll();
    }

    public void createTranslationEntity(TranslationEntry entry) {
        entry.setLastModified(formatter.format(LocalDateTime.now()));
        repository.save(entry);
        log.info("Entry added with id: " + entry.getId());
    }

    public TranslationEntry updateTranslationEntry(int id, TranslationEntry entry) {
        deleteTranslationEntry(id);
        entry.setLastModified(formatter.format(LocalDateTime.now()));
        return repository.save(entry);
    }

    public void deleteTranslationEntry(int textId) {
        repository.delete(Objects.requireNonNull(findById(textId)));
    }

    private TranslationEntry findById(int id) {
        Optional<TranslationEntry> entry = repository.findById(id);
        if(entry.isEmpty()) return null;
        return entry.get();
    }

    public List<TranslationEntry> searchTranslationEntities(SearchTranslationEntry searchEntry) {
        List<TranslationEntry> allEntries = (List<TranslationEntry>) getAllTranslationEntries();
        List<TranslationEntry> results = allEntries.stream()
                .filter(e -> filterTranslationEntites(e, searchEntry))
                .collect(Collectors.toList());

        return results;
    }

    private boolean filterTranslationEntites(TranslationEntry entry, SearchTranslationEntry searchEntry) {
        return (
                (searchEntry.getAppId() == null || entry.getAppId().equals(searchEntry.getAppId())) &&
                (searchEntry.getContext() == null || entry.getContent().equals(searchEntry.getContext())) &&
                (searchEntry.getStage() == null || entry.getStage().equals(searchEntry.getStage())) &&
                (searchEntry.getTextId() == null || entry.getTextId().equals(searchEntry.getTextId()))
                );
    }
}
