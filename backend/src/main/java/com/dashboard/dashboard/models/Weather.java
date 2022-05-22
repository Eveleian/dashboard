package com.dashboard.dashboard.models;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Weather{
	private String main;
	private String description;
	private String icon;
	private String city;
	private String country;
	private float temp;

	public Weather(String json) throws JsonMappingException, JsonProcessingException{
		ObjectMapper mapper = new ObjectMapper();
		JsonNode jsonNode = mapper.readTree(json);
		this.main=jsonNode.get("weather").get(0).get("main").asText();
		this.description=jsonNode.get("weather").get(0).get("description").asText();
		this.icon=jsonNode.get("weather").get(0).get("icon").asText();
		this.city=jsonNode.get("name").asText();
		this.country=jsonNode.get("sys").get("country").asText();
		this.temp=(Float.parseFloat(jsonNode.get("main").get("temp").asText()) - 32.0f) * 5.0f / 9.0f;
	}

	public String getMain() {
        return main;
	}

	public String getDescription() {
        return description;
	}

	public String getIcon() {
		return icon;
	}

	public String getCountry() {
        return country;
    }

    public  String getCity() {
        return city;
    }

	public float getTemp() {
		return temp;
	}

	public String getInfos() {
		return ("Weather {" +
				"main: '" + main + "', " +
				"description: '" + description + "', " +
				"icon: '" + icon + "', " +
				"country: '" + country + "', " +
				"city: '" + city + "', " +
				"temp: '" + (int)temp + "'" +
				"}");
	}
}
