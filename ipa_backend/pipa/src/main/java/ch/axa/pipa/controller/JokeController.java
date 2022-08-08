package ch.axa.pipa.controller;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin()
@AllArgsConstructor
public class JokeController {

    @GetMapping("/index")
    public String index() {
        return "hallo";
    }
}
