# Typeahead
![](https://learnjavascript.today/images/comps/typeahead.gif)
It's like Google's search bar, but only with countries
## General Info
This project helps users to complete what they’re typing. In other words, predicts what users want to type (in this case countries).
I highlight what the user typed in the list of predictions. This makes it easier for users to connect what they typed with what shows up.
I use the [**Rest API**](https://restcountries.com/ "**Rest API**") to get all the countries and the country flag for each country.
This project is a Manual library so anyone can download and use in your project.
Also this project has keyboard interaction. You can use the arrow keys like in the Google's search bar.
## Technologies
A list of technologies used within the project:
- HTML
- CSS
- JavaScript
- ZlFetch lbrary (You do not have to install because it is inside the project with the script tag)
## Installation
A little intro about the installation. 
```
$ git@github.com:santtier/Typeahead.git
$ cd Typeahead
```

## Collaboration
Give instructions on how to collaborate with your project.
There are a set of rules to keep in mind:

- Perform work in a feature branch.
  _Why:_
  > Because this way all work is done in isolation on a dedicated branch rather than the main branch. It allows you to submit multiple pull requests without confusion. You can iterate without polluting the master branch with potentially unstable, unfinished code. [read more...](https://www.atlassian.com/git/tutorials/comparing-workflows#feature-branch-workflow)
- Branch out from `main`

  _Why:_

  > This way, you can make sure that code in master will almost always build without problems, and can be mostly used directly for releases (this might be overkill for some projects).

- Never push into `main` branch. Make a Pull Request.

  _Why:_

  > It notifies team members that they have completed a feature. It also enables easy peer-review of the code and dedicates forum for discussing the proposed feature.

- Delete local and remote feature branches after merging.
  _Why:_
  > It will clutter up your list of branches with dead branches. It ensures you only ever merge the branch back into (`main`) once. Feature branches should only exist while the work is still in progress.

- Comment your code. Try to make it as clear as possible.
- Don't use comments as an excuse for a bad code. Keep your code clean.
- Don't use clean code as an excuse to not comment at all.
- Keep comments relevant as your code evolves.
- Recommended using [JSDoc](https://www.youtube.com/watch?v=r0H-acWQS6c)

## Demo
If you want to see the demo of this proyect deployed, you can visit [Typeahead](https://santtier.github.io/Typeahead/ "Typeahead")
