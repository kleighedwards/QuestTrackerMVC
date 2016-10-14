package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import entities.Conquest;
import entities.Land;

@Transactional
public class QuestDAO {

	@PersistenceContext
	private EntityManager em;

	// Get All Conquests
	public List<Conquest> index() {
		String query = "Select c from Conquest c";
		List<Conquest> quests = em.createQuery(query, Conquest.class).getResultList();

		return quests;
	}

	// Get Conquest By ID
	public Conquest show(int id) {
		return em.find(Conquest.class, id);
	}

	// Add New Conquest
	public void create(Conquest quest) {
		Conquest newQuest = new Conquest();
		
		newQuest.setFoe(quest.getFoe());
		newQuest.setTale(quest.getTale());
		newQuest.setImage(quest.getImage());
		newQuest.setGold(quest.getGold());
		
		newQuest.setLoot(quest.getLoot());
		
		
		String query = "Select c.land from Conquest c";
		List<Land> lands = em.createQuery(query, Land.class).getResultList();

		Land newLand = quest.getLand();

		for (Land land : lands) {
			if (land.getName().equalsIgnoreCase(newLand.getName())) {
				newQuest.setLand(land);
			}
		}
		if (newQuest.getLand() == null) {
			newLand.setName(quest.getLand().getName());
			em.persist(newLand);
			newQuest.setLand(newLand);
		}

		em.persist(newQuest);
		em.flush();
	}

	// Delete Conquest
	public void destroy(int id) {
		Conquest deleteQuest = em.find(Conquest.class, id);

//		Land land = new Land();
//		land.setName("Name");
//		land.setDescription("Description");
//		land.setImage("Image");
//		deleteQuest.setLand(land);
//		
//		em.persist(deleteQuest);
		
		
		
		em.remove(deleteQuest);
	}

	// Edit Conquest
	public Conquest update(int id, Conquest quest) {
		Conquest editQuest = em.find(Conquest.class, id);

		if (!quest.getFoe().equals("")) {
			editQuest.setFoe(quest.getFoe());
		}
		if (!quest.getTale().equals("")) {
			editQuest.setTale(quest.getTale());
		}
		if (!quest.getImage().equals("")) {
			editQuest.setImage(quest.getImage());
		}

		editQuest.setGold(quest.getGold());
		
		String query = "Select c.land from Conquest c";
		List<Land> lands = em.createQuery(query, Land.class).getResultList();
		Land newLand = quest.getLand();

		for (Land land : lands) {
			if (land.getName().equalsIgnoreCase(newLand.getName())) {
				land.setName(newLand.getName());
				land.setDescription(newLand.getDescription());
				land.setImage(newLand.getImage());
				em.persist(land);
				
				editQuest.setLand(land);
			}
		}
		if (!newLand.getName().equals(quest.getLand().getName())) {
			em.persist(newLand);
			editQuest.setLand(newLand);
		}
		System.out.println(editQuest);
		em.persist(editQuest);

		return editQuest;
	}
}
