---
title: Zabbix
---

Zabbix est une plateforme de supervision open source pour les réseaux, serveurs, services cloud et
applications. Elle collecte des métriques via des agents, SNMP, IPMI et des contrôles sans agent,
puis fournit alertes, visualisation et tableaux de bord depuis un frontend web unique. Cette image
fournit le serveur Zabbix, le frontend web et l'agent avec une base MySQL sur Apache.

## Logiciels inclus

| Composant | Version   |
| --------- | --------- |
| Zabbix    | 7.0 (LTS) |
| MySQL     | 8.0       |
| Apache    | 2.4.x     |
| Ubuntu    | 24.04 LTS |

## Prérequis

| Ressource | Minimum | Recommandé |
| --------- | ------- | ---------- |
| vCPU      | 2       | 4          |
| RAM       | 2 Go    | 4 Go       |
| Stockage  | 30 Go   | 60 Go      |

## Variables d'environnement

Cette image n'accepte aucune variable au déploiement. Elle ne crée aucun mot de passe administrateur
partagé. Zabbix est livré avec un mot de passe `Admin` par défaut, et le premier démarrage le
remplace par une valeur propre à votre machine virtuelle.

## Démarrage

### 1. Connectez-vous à votre VM

```bash
ssh ubuntu@<your-vm-ip>
```

### 2. Attendez la configuration au premier démarrage

Au premier démarrage, un script initialise MySQL, importe le schéma Zabbix, écrit la configuration
du frontend, démarre les services et remplace le mot de passe `Admin` par défaut. Suivez la
progression:

```bash
journalctl -u zabbix-first-boot.service -f
```

Le message de connexion (MOTD) confirme que Zabbix est prêt.

### 3. Récupérez le mot de passe administrateur

Les identifiants sont écrits dans un fichier réservé à root:

```bash
sudo cat /root/.credentials/zabbix.txt
```

### 4. Ouvrez le frontend web

Ouvrez un navigateur à l'adresse:

```text
http://<your-vm-ip>/zabbix/
```

Connectez-vous en tant que `Admin` avec le mot de passe de l'étape précédente.

:::caution

Zabbix est livré avec un mot de passe `Admin` par défaut bien connu. Cette image le remplace au
premier démarrage, ne réutilisez donc pas la valeur par défaut documentée par le projet en amont.

:::

## Gérer Zabbix

```bash
# Vérifier l'état
sudo systemctl status zabbix-server apache2 mysql

# Redémarrer le serveur
sudo systemctl restart zabbix-server

# Consulter les journaux
sudo tail -f /var/log/zabbix/zabbix_server.log
```

La configuration du serveur se trouve dans `/etc/zabbix/zabbix_server.conf` et celle du frontend
dans `/etc/zabbix/web/`.

## Sécurité

Le port 80 (frontend web) et le port 10051 (serveur Zabbix, utilisé par les agents pour remonter
leurs données) sont ouverts sur l'interface réseau de la VM. UFW est activé et autorise ces ports
ainsi que SSH (port 22).

**Pour restreindre le frontend web à une adresse IP précise:**

```bash
sudo ufw delete allow 80/tcp
sudo ufw allow from <trusted-ip> to any port 80
```

**En production**, pointez un enregistrement DNS vers la VM et placez Apache derrière TLS, avec
votre propre certificat ou un reverse proxy qui termine le TLS.

## Prochaines étapes

- [Documentation Zabbix](https://www.zabbix.com/documentation/7.0/en/)
- [Configuration de l'agent Zabbix](https://www.zabbix.com/documentation/7.0/en/manual/appendix/config/zabbix_agentd)
- [Référence de l'API Zabbix](https://www.zabbix.com/documentation/7.0/en/manual/api)
