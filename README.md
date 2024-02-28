# SBA 316: The Document Object Model

* **Name**: Richard Tillies
* **Date**: February 28, 2024
* **Instructions**: [SBA Document Object Model](sba-document-object-model.pdf)

## Application Description

### Panel 1

The first panel generates a random playing card by clicking the card image.

  * There are 54 cards in the deck: 2 jokers and 13 cards in each of the four suits (spades, diamonds, clubs, hearts).
  * The initial card is the Big Joker.

### Panel 2

The second panel keeps a record of the cards shown in the first panel.

  * The list starts with one item: Big Joker
  * When the user clicks the card image, the details from the new card will appear that the top of the list.

### Panel 3

The third panel provides a (non-functional) form to sign up for a fictional newsletter.

  * An alert error will appear if the name field is blank.
  * An alert error will appear if the email field is blank.
  * A tip will appear if the email entered does not meet the "email" HTML attribute validation criteria.
  * The referral code input box is disabled until the user checks the "I have a referral code" checkbox.
  * If the checkbox is checked, an alert error will appear if the referral code field is blank or if the referral code is not a number.
  * When the form is fully validated, an alert box will appear with a welcome message.

### Notes | Blockers

  * Submitting a validated form in the third panel displays an alert box but also resets the page. 
  * The original goal was to add/change text on the third panel after form submission, and any other changes on the page would persist.
