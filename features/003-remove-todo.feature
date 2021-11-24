Feature: Remove items from the list
  I want to make sure that items can be remove from the TODO list at https://todomvc.com/examples/angular2/.

  Scenario Outline: Can delete items of the TODO list
    Given that I navigated to the todo list page using "<browser>"
    And the list has become available
    And that the list has the items: "<all-items-in-list>"
    When I click to remove the items: "<items-to-remove>"
    Then I should see only the remaining items "<remaining-items>" in the list

  @debug
  Examples:
    | browser                    | all-items-in-list                                                                                                                                                           | items-to-remove                                                           | remaining-items                                                                                   |
    | Microsoft Edge             | Create cucumber application capable of testing this page;Test application;Write application's documentation;Write test cases;Validate test cases;Submit testing application | Create cucumber application capable of testing this page;Test application | Write application's documentation;Write test cases;Validate test cases;Submit testing application |

  @smoke
  Examples:
    | browser                    | all-items-in-list                                                                                                                                                           | items-to-remove                                                           | remaining-items                                                                                   |
    | Microsoft Edge             | Create cucumber application capable of testing this page;Test application;Write application's documentation;Write test cases;Validate test cases;Submit testing application | Create cucumber application capable of testing this page;Test application | Write application's documentation;Write test cases;Validate test cases;Submit testing application |
    | Google Chrome              | Create cucumber application capable of testing this page;Test application;Write application's documentation;Write test cases;Validate test cases;Submit testing application | Create cucumber application capable of testing this page;Test application | Write application's documentation;Write test cases;Validate test cases;Submit testing application |

  @regression
  Examples:
    | browser                    | all-items-in-list                                                                                                                                                           | items-to-remove                                                           | remaining-items                                                                                   |
    | Microsoft Edge             | Create cucumber application capable of testing this page;Test application;Write application's documentation;Write test cases;Validate test cases;Submit testing application | Create cucumber application capable of testing this page;Test application | Write application's documentation;Write test cases;Validate test cases;Submit testing application |
    | Microsoft Edge             | Write application's documentation;Write test cases;Validate test cases;Submit testing application                                                                           | Write test cases                                                          | Write application's documentation;Validate test cases;Submit testing application                  |
    | Microsoft Edge             | Write application's documentation;Validate test cases;Submit testing application                                                                                            | Write application's documentation;Validate test cases                     | Submit testing application                                                                        |
    | Microsoft Edge             | Submit testing application                                                                                                                                                  | Submit testing application                                                |                                                                                                   |
    | Microsoft Edge - InPrivate | Create cucumber application capable of testing this page;Test application;Write application's documentation;Write test cases;Validate test cases;Submit testing application | Create cucumber application capable of testing this page;Test application | Write application's documentation;Write test cases;Validate test cases;Submit testing application |    
    | Google Chrome              | Create cucumber application capable of testing this page;Test application;Write application's documentation;Write test cases;Validate test cases;Submit testing application | Create cucumber application capable of testing this page;Test application | Write application's documentation;Write test cases;Validate test cases;Submit testing application |
    | Google Chrome              | Write application's documentation;Write test cases;Validate test cases;Submit testing application                                                                           | Write test cases                                                          | Write application's documentation;Validate test cases;Submit testing application                  |
    | Google Chrome              | Write application's documentation;Validate test cases;Submit testing application                                                                                            | Write application's documentation;Validate test cases                     | Submit testing application                                                                        |
    | Google Chrome              | Submit testing application                                                                                                                                                  | Submit testing application                                                |                                                                                                   |
    | Google Chrome - Incognito  | Create cucumber application capable of testing this page;Test application;Write application's documentation;Write test cases;Validate test cases;Submit testing application | Create cucumber application capable of testing this page;Test application | Write application's documentation;Write test cases;Validate test cases;Submit testing application |
    