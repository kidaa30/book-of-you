# bookofyou
## An experiment in knockout.js, monologue.js, and backbone.js

## To see in what little action there presently is [here](http://bookofyou.joshuaebowling.info)

## Getting started:
1. Get Repo
2. npm install
3. bower install
4. gulp templates (do this whenever you edit the jade/templates -- yeah I need some devops lol)
5. browserify ./public/javascripts/app.js > ./public/javascripts/bundle.js (gulp is not bundling presently, switching to grunt)
6. npm start

## To test
gulp test
*Incidentally, the process of getting gulp, karma, & jasmine to run was not straightforward. Multiple dependencies don't seem to install properly. Will be looking into resolution after I cover my existing code w/ tests*

##Why?
I've often thought that modern communication is reductive because because it occurs in fragments that are curated by machines ala facebook/twitter/etc. This process leads only to more trivial complexity that is measured in terms of commerce (commerce is awesome, after all it's how I pay my bills, too.) Hopefully, other people in the world (yes, perhaps you, too) feel the same way. If so, you and me,  you or me, or some other group of people altogether will create a serious medium for the application of spirit to digital society.

*While the idea is a noble ambition (in my opinion, of course), I must admit that I needed, for professional reasons, to get involved in open-sourcery as the overwhelming majority of my work has been done under NDAs.* 

##Technological Considerations
I've used knockout, backbone, postal, angular, react (a bit) often in the last few years. I even tried amalgamations like KnockBack which I enjoyed, also. But all of them seem to have drawbacks which I don't need to enumerate. 
Recently, I was reading about React.js's flux pattern and thought the author brought up some of these criticisms and suggested that flux pattern was the answer; thus I was interested in the the theory behind pattern, but not the framework. Frameworks are a double-edged sword indeed. However, connecting knockout to backbone using postal/monologue and browserify seemed very interesting and doable. I'm not sure how it turned out yet because what I have here is by NO means systematized, complete, useful. 
Nevertheless, a number of questiony observations (in no particular order) came up as I developed this trifle:

1. The intermediary between knockout and backbone is what I've dubbed an observer (which I now sense is a misnomer). Nevertheless, it's within this observer (public/javascripts/observers/book.js) that I've tried to limit the use of knockout AND backbone in the same module.

2. As I coded the aforementioned observer, I found that knockout observables were useful to retain returnable/discrete values (like what the currently selected chapter is), and monologue's workers were good for requesting processes (like adding chapters, updating verse text, naming the book). 

3. I haven't attempted to truly organize my pub-sub topics because I haven't chosen a means by which to accomplish this. So, you'll find the topics referenced in a hard-coded manner in the some of the view models and observer.

4. The observer's structure is something on which I still haven't settled which is evident, but not trivial nor essential.

5. I've done very little on the node side of this code because the my idea seemed to draw toward the UI first, which is not always the case.

6. Tests -- I haven't written any yet and this is probably my next step.

7. Knockout's pureComputed-s remind me of C# properties.

8. I'm outputting rendered jade templates into a folder which are then served by express as static files to fill the template properties of knockout components.

9. TBC...


##Curent State of Development (Or lack thereof)
In terms of development, this is only an input experiment right now, so not much in terms of overall view. There's only express-scaffolded code on the node side right now. Presently, my priority is to get an import/export function setup so content can be read/wrote from json via textarea (for starters).

##A Note for Potential Clients and Decision-Makers Thereof
I've written code in lots of styles and structures. Some are sort of like this and others have been drastically different and am pleased to adapt to standards and practices you may already have in place. I'm also just as happy to comment/opine on practices and standards should you ask.
