package com.dashboard.dashboard.controllers;

import com.dashboard.dashboard.models.Weather;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {
    @GetMapping
    public String getWeather(@RequestParam String city) throws JsonMappingException, JsonProcessingException, RestClientException {
        // Select you openweathermap api at the end of the next line
        String weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=";

        RestTemplate restTemplate = new RestTemplate();
        String weather = restTemplate.getForObject(weatherUrl, String.class);
        
        return(weather);
    }
}