package com.dashboard.dashboard.controllers;

import java.time.Instant;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/about.json")
public class AboutJsonController {
    
    @GetMapping
    public String getAboutJson(HttpServletRequest request) {
        String aboutJson = "{\n" +
        "   \"client\": {\n" +
        "       \"host\": "+ request.getRemoteAddr() + "\n" +
        "   },\n" +
        "   \"server\": {\n" +
        "       \"current_time\": " + Instant.now().getEpochSecond() + ",\n" +
        "       \"services\": [{\n" +
        "           \"name\": \"weather\",\n" +
        "           \"widgets\": [{\n" +
        "               \"name\": \"city_temperature\",\n" +
        "               \"description\": \"Display temperature for a city\",\n" +
        "               \"params\": [{\n" +
        "                   \"name\": \"city\",\n" +
        "                   \"type\": \"string\"\n" +
        "               }]\n" +
        "           }]\n" +
        "       }, {\n" +
        "           \"name\": \"youtube\",\n" +
        "           \"widgets\": [{\n" +
        "               \"name\": \"flow\",\n" +
        "               \"description\": \"Display 5 random youtube videos\",\n" +
        "               }]\n" +
        "           }, {\n" +
        "               \"name\": \"channel\",\n" +
        "               \"description\": \"Display channel informations about a youtube channel\",\n" +
        "               \"params\": [{\n" +
        "                   \"name\": \"channelId\",\n" +
        "                   \"type\": \"string\"\n" +
        "               }]\n" +
        "           }, {\n" +
        "               \"name\": \"video\",\n" +
        "               \"description\": \"Display video informations about a youtube video\",\n" +
        "               \"params\": [{\n" +
        "                   \"name\": \"videoId\",\n" +
        "                   \"type\": \"string\"\n" +
        "               }]\n" +
        "           }]\n" +
        "       }]\n" +
        "   }\n" +
        "}";
        return aboutJson;
    }
}
