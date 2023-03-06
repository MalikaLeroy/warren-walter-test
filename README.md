# Notes concernant les tests &#128578;
## Test Card
J'ai respecté les tailles de police et les couleurs présentées dans le commentaire et le fichier PNG fourni, mais j'ai remarqué que la maquette présente quelques problèmes d'accessibilité au niveau du style. Par exemple, la couleur du texte dans la zone "nombre de commentaires" manque de contraste avec le fond vert clair, de plus, la taille de police du paragraphe en Lorem ipsum est trop petite et il manque d'interlignage ces deux élements ne sont donc pas accessibles.

Je ne suis pas sûr si, dans cet exercice, l'objectif était de privilégier le respect de la maquette imposée ou l'accessibilité. Toutefois, il est important de prendre en compte l'accessibilité aussi dans la conception des maquettes. 

## Page-access
Voici les modifications que j'aurais apportées en plus, mais qui dépassent peut-être le cadre du test :
- Modification de la couleur rouge pour certains éléments : le rouge utilisé pose problème dans certains cas pour le niveau de conformité AAA, mais je ne sais pas si j'avais la possibilité de modifier l'une des couleurs de la "charte graphique".
- Intégration d'un vrai header mobile : pour le responsive, j'ai réorganisé les éléments, mais dans le cas du header, il aurait été préférable de faire un vrai header mobile.
- Augmentation de la taille du champ recherche dans le header.
- Concernant le panier :
    - Intégration d'un système de dropdown : il aurait été préférable d'avoir un système de dropdown avec l'utilisation d'un aria-expanded="false/true" pour éviter une augmentation de la hauteur du header lors de l'ajout d'un produit.         
    - Ajout d'un compteur "X [number]"" pour éviter les répétitions lorsqu'un même produit est ajouté plusieurs fois.