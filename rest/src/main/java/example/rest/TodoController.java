package example.rest;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class TodoController {

	
	private final AtomicInteger counter = new AtomicInteger();
	
	@GetMapping("/test")
	public Todo todo(@RequestParam(value = "title", defaultValue = "doSomthing") String title) {
		//return new Todo(counter.incrementAndGet(), String.format(template, title));
		return new Todo(counter.incrementAndGet(),title);
	}
	@Autowired
	TodoService todoService;
	
	@GetMapping("/getAll")
	public List<Todo> getTodo(@RequestParam(value = "id", defaultValue = "0") String id) {
		
		return todoService.getAll();
	}
	@GetMapping("/post")
	public int postTodo(@RequestParam(value = "id", defaultValue = "0") String id, @RequestParam(value = "title", defaultValue = "doSomthing") String title) {
		
		return todoService.create(title, Integer.valueOf(id));
	}
}