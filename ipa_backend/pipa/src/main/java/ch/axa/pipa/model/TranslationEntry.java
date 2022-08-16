package ch.axa.pipa.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "translation_entry")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TranslationEntry implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String textId;
    private String appId;
    private String content;
    private String stage;
    private String german;
    private String english;
    private String french;
    private String italian;
    private boolean translated;
    private String lastModified;

}
