package com.dashboard.dashboard.controllers;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/youtube")
public class YoutubeController {

    // Select you youtube api at the end of the next line
    private String youtubeKey = "";

    @GetMapping("/video/{id}")
    public String getVideoById(@PathVariable(value = "id") String id) {
        String ytApiUrl = "https://www.googleapis.com/youtube/v3/videos?id="+id+"&key="+youtubeKey+"&part=snippet,contentDetails,statistics,status";

        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(ytApiUrl, String.class);

        return(result);
    }

    @GetMapping("/channel/{id}")
    public String getChannelVideoById(@PathVariable(value = "id") String id) {
        String ytApiUrl = "https://www.googleapis.com/youtube/v3/search?channelId="+id+"&key="+youtubeKey+"&part=snippet";

        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(ytApiUrl, String.class);

        return(result);
    }

    @GetMapping()
    public String getVideo() {
        String ytApiUrl = "https://www.googleapis.com/youtube/v3/search?key="+youtubeKey+"&part=snippet";

        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(ytApiUrl, String.class);

        return(result);
    }
}