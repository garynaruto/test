package example.rest;

import javax.persistence.Entity;
import org.springframework.stereotype.Component;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
public class Todo {
	int id;
	String title;
	String text;
	String status;
	public  Todo() {}
	public  Todo(int id, String title) {
		this.id = id;
		this.title = title;
		this.text="";
		this.status="";
	}
	public long getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}
}
