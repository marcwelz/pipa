package ch.axa.pipa.controller;

import ch.axa.pipa.model.TranslationEntry;
import ch.axa.pipa.service.TranslationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/translation")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class TranslationController {

    private final TranslationService service;

    private final String REQUEST_PARAM_TEXT_ID = "/{id}";

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<TranslationEntry> getAllTranslationEntries() {
        System.out.println(LocalDateTime.now());
        return service.getAllTranslationEntries();
    }

    @PostMapping
    public void createTranslationEntity(@NotEmpty @Valid @RequestBody TranslationEntry entry) {
        service.createTranslationEntity(entry);
    }

    @PutMapping(value = REQUEST_PARAM_TEXT_ID, produces = MediaType.APPLICATION_JSON_VALUE)
    public TranslationEntry updateTranslationEntry(@NotBlank @PathVariable int id, @NotEmpty @Valid @RequestBody TranslationEntry entry) {
        return service.updateTranslationEntry(id, entry);
    }

    @DeleteMapping(value = REQUEST_PARAM_TEXT_ID)
    public void deleteTranslationEntry(@NotBlank @PathVariable int id) {
        service.deleteTranslationEntry(id);
    }
}
