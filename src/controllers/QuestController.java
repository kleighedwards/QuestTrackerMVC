package controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import data.QuestDAO;
import entities.Conquest;

@RestController
public class QuestController {

	@Autowired
	private QuestDAO questDAO;

	// Ping Pong To Test Connection Successful
	@RequestMapping(path = "/ping", method = RequestMethod.GET)
	public String ping() {
		return "pong";
	}

	// Returns All Conquests
	@RequestMapping(path = "quest", method = RequestMethod.GET)
	public List<Conquest> index() {
		return questDAO.index();
	}

	// Returns A Single Conquest With The Provided ID
	@RequestMapping(path = "quest/{id}", method = RequestMethod.GET)
	public Conquest show(@PathVariable int id) {
		return questDAO.show(id);
	}

	// Adds A New Conquest
	@RequestMapping(path = "quest", method = RequestMethod.POST)
	public void create(@RequestBody String jsonQuest, HttpServletResponse response) {
		ObjectMapper mapper = new ObjectMapper();
		Conquest newQuest = null;

		try {
			newQuest = mapper.readValue(jsonQuest, Conquest.class);
		} catch (Exception e) {
			e.printStackTrace();
		}

		response.setStatus(201);
		questDAO.create(newQuest);
	}

	// Edit A Conquest
	@RequestMapping(path = "quest/{id}", method = RequestMethod.PUT)
	public void update(@PathVariable int id, @RequestBody String jsonQuest) {
		ObjectMapper mapper = new ObjectMapper();
		Conquest editQuest = null;

		try {
			editQuest = mapper.readValue(jsonQuest, Conquest.class);
		} catch (Exception e) {
			e.printStackTrace();
		}

		editQuest = questDAO.update(id, editQuest);
	}

	// Delete A Conquest
	@RequestMapping(path = "quest/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable int id) {

		try {
			questDAO.destroy(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
