\_\_Entities

- List
  ** addto
  ** remove
  ** [future] update
  ** retrieve(populate)
  ** sum of items
  ** last removed
  \*\* undo removal

- ListItem
  \*\* [future] edit

\_\_Application

- header
  \*\* add item to list

\*list
\*\*

footer

## Items of Note

List is the container and parent component that contains the other child components and the content (the list)

\_\_Undo

When remove action is invoked, a copy of the item array before the target item is removed(filtered out) is stored and the content of the removed item is stored to display in the undo prompt (in the footer). If the user chooses yes, the current array (which does not have the removed item) is replaced with the array before the removal. React updates (since the array is stored in state) the list to reflect the original list before removal (undone). some other state clean up is done, including removing the undo prompt.

\_\_For AddItem

- add button was always enabled, allow user to add blank items

* disabling the button is a quick (but not foolproof) way to prevent blank adds. It makes checking for blanks before the item is added secondary since the user will not be able to click a disabled add button. I say secondary as opposed to unnecessary, because a user could bypass the disabled property and be able to click add button. the secondary check would make sense in any code that is not example code.

add field was not cleared after succesfull add

\_\_For content

- Removing one item will remove all other items that have the same content.

* the initial way to remove was to find the item in the array that matches the content(string value) of the item set to be removed. That is not unique, since other items could have the exact same content. When you have a list, always look for what data can uniquely identify each item. In this case, the array index is the unique identifier.
* Remove item was changed to pass in the index. Undo still gets passed content, but it is accessed by referencing the index location in the array.
