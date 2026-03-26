# Questions de réflexion

**Pourquoi l'image Docker doit rester la même entre dev et prod ?**

Car le Dockerfile n'est pas censé être dépendant des environnements, son but est d'être compatible à tous les environnements justement.

---

**Pourquoi l'API se connecte à `db` et pas à `localhost` ?**

Pour être malléable à tous les environnements, ça nous évite de modifier le `.env` ou l'URL directement. Les services sont dans le même network, ce qui fait qu'ils peuvent s'appeler directement via leur nom de service.

---

**Pourquoi séparer l'installation des dépendances et la copie du code ?**

La séparation de l'installation permet de gagner en performance, ça permet de garder en cache les dépendances déjà existantes sans forcément les réinstaller.

---

**Pourquoi les secrets ne doivent pas être dans le code ni dans le dépôt Git ?**

N'importe quelle personne qui a accès au repo ou au code pourrait les intercepter et les utiliser.

---

**Pourquoi la table `notes` n'existe plus après un `docker compose down` ?**

Car la DB est stateful — elle écrit dans le filesystem du container. Quand le container est supprimé, les données partent avec. C'est pour ça qu'on utilise un volume.

---

**Pourquoi ne pas mettre les données directement dans le container ?**

Le container est éphémère, on pourrait perdre des données importantes si on le relance. Le volume fait vivre les données en dehors du container.

---

**Quel composant est stateful ? Lequel est stateless ?**

La DB est stateful — elle doit persister. L'API est stateless — elle ne stocke rien, elle peut être recréée sans perte.
