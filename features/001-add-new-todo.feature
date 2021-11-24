Feature: Add new item to list
  I want to make sure that I can add new items to the TODO list at https://todomvc.com/examples/angular2/.

  Scenario Outline: I Can add new items to the list of TODOs
    Given that I navigated to the todo list page using "<browser>"
    And the list has become available
    And that the list loads with the items: "<all-items-in-list>"
    When I add the items: "<new-list-items>" to the list
    Then I should see "<new-list-items>" appended to "<all-items-in-list>"

  @debug
  Examples:
  | browser                    | all-items-in-list | new-list-items                                                                                                                                                               |
  | Microsoft Edge             |                   | Create cucumber application capable of testing this page;Test application;Write application's documentation;Write test cases;Validate test cases;Submit testing application  |

  @smoke
  Examples:
  | browser                    | all-items-in-list | new-list-items                                                                                                                                                               |
  | Microsoft Edge             |                   | Create cucumber application capable of testing this page;Test application;Write application's documentation;Write test cases;Validate test cases;Submit testing application  |
  | Google Chrome              |                   | Create cucumber application capable of testing this page;Test application;Write application's documentation;Write test cases;Validate test cases;Submit testing application  |
    
  @regression
  Examples:
    | browser                    | all-items-in-list                                                                                                                                | new-list-items                                                             |
    | Microsoft Edge             |                                                                                                                                                  | Create cucumber application capable of testing this page;Test application  |
    | Microsoft Edge             | Create cucumber application capable of testing this page;Test application                                                                        | Write application's documentation                                          |
    | Microsoft Edge             | Create cucumber application capable of testing this page;Test application;Write application's documentation                                      | Write test cases;Validate test cases                                       |
    | Microsoft Edge             | Create cucumber application capable of testing this page;Test application;Write application's documentation;Write test cases;Validate test cases | Submit testing application                                                 |
    | Microsoft Edge - InPrivate |                                                                                                                                                  | Create cucumber application capable of testing this page;Test application  |
    | Google Chrome              |                                                                                                                                                  | Create cucumber application capable of testing this page;Test application  |
    | Google Chrome              | Create cucumber application capable of testing this page;Test application                                                                        | Write application's documentation                                          |
    | Google Chrome              | Create cucumber application capable of testing this page;Test application;Write application's documentation                                      | Write test cases;Validate test cases                                       |
    | Google Chrome              | Create cucumber application capable of testing this page;Test application;Write application's documentation;Write test cases;Validate test cases | Submit testing application                                                 |
    | Google Chrome - Incognito  |                                                                                                                                                  | Create cucumber application capable of testing this page;Test application  |
