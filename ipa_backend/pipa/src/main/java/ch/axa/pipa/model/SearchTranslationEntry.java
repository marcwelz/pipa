package ch.axa.pipa.model;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SearchTranslationEntry implements Serializable {
    private String appId;
    private String context;
    private String textId;
    private String stage;
}
