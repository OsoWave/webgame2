import { db } from '../config/firebase';
import { doc, setDoc, collection } from 'firebase/firestore';
import { classTemplates } from '../data/classTemplates';
import { questTemplates } from '../data/questTemplates';

export const initializeDatabase = async () => {
  try {
    // Initialize default game settings
    await setDoc(doc(db, 'settings', 'game'), {
      experienceMultiplier: 1,
      levelUpExperienceBase: 1000,
      levelUpExperienceMultiplier: 1.5,
      pvpCooldownMinutes: 30,
      maxQuestsPerDay: 10,
      maxLevel: 50
    });

    // Initialize character classes
    for (const classTemplate of classTemplates) {
      await setDoc(doc(collection(db, 'classes'), classTemplate.name.toLowerCase()), {
        name: classTemplate.name,
        description: classTemplate.description,
        baseStats: classTemplate.baseStats,
        icon: classTemplate.icon
      });
    }

    // Initialize quest templates
    for (const questTemplate of questTemplates) {
      await setDoc(doc(collection(db, 'quests'), questTemplate.name.toLowerCase().replace(/\s+/g, '-')), {
        name: questTemplate.name,
        description: questTemplate.description,
        minLevel: questTemplate.minLevel,
        steps: questTemplate.steps,
        monsterTypes: questTemplate.monsterTypes,
        experienceMultiplier: questTemplate.experienceMultiplier
      });
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};