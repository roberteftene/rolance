package be.payload.request;

import lombok.Data;

@Data
public class FilterRequestPayload {

    String city;
    String category;
    String price;
    String skills;

    public FilterRequestPayload(String city, String category, String price, String skills) {
        this.city = city;
        this.category = category;
        this.price = price;
        this.skills = skills;
    }
}
