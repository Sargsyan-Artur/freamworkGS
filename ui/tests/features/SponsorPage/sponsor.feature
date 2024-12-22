@dev @qa @all
Feature: [AGAR-529] Checking provider page

  Scenario: Open Sponsor Page
    Given the User opens greensky page

  Scenario Outline: Check elements visibility
    Then the User sees "<Element>" <Type> is visible on "<Page Name>" page

    Examples:
      | Page Name | Element               | Type   |
      | Sponsor   | How The Program Works | button |
      | Sponsor   | Benefits              | button |
      | Sponsor   | Our Products          | button |
      | Sponsor   | Mobile App Advantage  | button |
      | Sponsor   | First Name            | input  |
      | Sponsor   | Last Name             | input  |
      | Sponsor   | Company               | input  |
      | Sponsor   | Phone Number          | input  |
      | Sponsor   | Email                 | input  |

  Scenario Outline: Check that the user sees error messages during wrong inputs
    Given the User opens greensky page
    Then the User enters "Text" value in "<Element>" input on "<Page Name>" page
    And the User clicks "Get Started" button on "<Page Name>" page

    And the User sees "<Error>" error message for "<Field>" field on "<Page Name>" page

    Examples:
      | Page Name | Element    | Field                       | Error                   |
      | Sponsor   | First Name | Required Message Last Name  | This field is required. |
      | Sponsor   | Last Name  | Required Message First Name | This field is required. |
      | Sponsor   | Company    | Required Message First Name | This field is required. |
