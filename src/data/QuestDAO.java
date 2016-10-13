package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import entities.Conquest;

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
		em.persist(quest);
		em.flush();
	}

	// Delete Conquest
	public void destroy(int id) {
		Conquest deleteQuest = em.find(Conquest.class, id);

		em.remove(deleteQuest);
	}

	// Edit Conquest
	public Conquest update(int id, Conquest quest) {
		Conquest editQuest = em.find(Conquest.class, id);

		// Set New Foe
		editQuest.setFoe(quest.getFoe());
		// Set New Land
		editQuest.setLand(quest.getLand());
		// Set New Gold Amount
		editQuest.setGold(quest.getGold());
		// Set New Tale
		editQuest.setTale(quest.getTale());

		em.persist(editQuest);

		return editQuest;
	}
}
