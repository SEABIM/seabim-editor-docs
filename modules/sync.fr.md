# Synchronisation

Le module **Synchronisation** échange la structure du projet (le JSON des
blocs) avec l'**API cloud SEABIM**. Il permet de récupérer une structure
déposée sur le serveur ou d'y publier la structure courante.

!!! note "Onglet sous licence"
    L'onglet `Synchronisation` n'apparaît **que si le bit de licence
    correspondant est actif** (cf. [Activation de la
    licence](../demarrage/activation-licence.md)). S'il est absent de votre
    launcher, votre licence ne comprend pas cette option.

## Identifiants de connexion { #credentials }

Deux champs sont à renseigner, **aucune valeur n'est fournie par défaut** :

- **URL de l'API** — l'adresse du point d'accès `json-api` du serveur SEABIM,
  qui vous est communiquée par SEABIM.
- **Clé d'API** — le jeton `X-API-KEY` qui vous est communiqué par SEABIM
  (masqué à la saisie).

Le bouton **`Enregistrer les identifiants`** persiste les deux valeurs dans
`parameters.json` (`sync_api_url`, `sync_api_key`) dans votre dossier de
données utilisateur. Elles sont donc conservées d'une session à l'autre. Les
deux valeurs sont **obligatoires** pour activer le téléchargement et l'envoi.

## Télécharger { #download }

Récupère la structure JSON stockée sur le serveur et l'**applique dans la
scène CloudCompare**, exactement comme un [`Charger un
JSON`](input.md#load-json). La structure ainsi chargée remplace l'historique
courant (la pile d'annulation est réinitialisée sur cet état).

## Envoyer { #upload }

Sérialise la **structure courante** et l'envoie au serveur (POST).

!!! warning "Écrasement côté serveur"
    L'envoi **écrase la structure stockée sur le serveur**. Une confirmation
    est demandée avant l'opération. S'il n'y a aucun bloc à envoyer, l'action
    le signale et n'envoie rien.

## Notes techniques

- Les appels HTTP sont **synchrones** : le launcher peut se figer une à deux
  secondes pendant le transfert, comme les autres actions du plugin.
- Le module dépend de la bibliothèque Python **`requests`** (installée par
  l'installeur). Si elle est absente, un message d'erreur explicite s'affiche.
