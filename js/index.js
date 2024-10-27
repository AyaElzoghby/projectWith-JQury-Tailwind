$(document).ready(function () {
  const apiUrl = "https://www.themealdb.com/api/json/v1/1/";

  $("#toggle-nav").click(function () {
    $(".side-nav-menu").toggleClass("translate-x-0 -translate-x-full");

    if ($(this).hasClass("fa-bars")) {
      $(this).removeClass("fa-bars").addClass("fa-xmark");
      $("#sideMenu").removeClass("hidden");
      $("#sideNav")
        .removeClass("grid-cols-1 max-w-20	")
        .addClass("grid-cols-4 max-w-xs");
      $("#sideNav").removeClass("max-w-20	").addClass(" max-w-xs");
    } else {
      $(this).removeClass("fa-xmark").addClass("fa-bars");
      $("#sideMenu").addClass("hidden");
      $("#sideNav")
        .removeClass("grid-cols-4 max-w-xs")
        .addClass("grid-cols-1 max-w-20");
    }
  });

  function loadMeals(mealName = "") {
    $.getJSON(apiUrl + "search.php?s=" + mealName, function (data) {
      $("#content").empty();
      if (data.meals) {
        data.meals.forEach((meal) => {
          $("#content").append(`
 <div class="rounded-lg shadow-md transition-transform group">
  <div class="relative">
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full object-cover rounded">
    <div class="rounded-lg view-details shadow-md absolute inset-0 group-hover:bg-black-900 group-hover:text-white transition-colors duration-300 flex items-end p-4" data-id="${meal.idMeal}">
      <h2 class="font-bold text-lg group-hover:text-white">${meal.strMeal}</h2>
    </div>
  </div>
</div>
            `);
        });
      } else {
        $("#content").append("<p class='text-red-500'>No meals found.</p>");
      }
    }).fail(function () {
      $("#content").html(
        "<p class='text-red-500'>Error loading meals. Please try again later.</p>"
      );
    });
  }

  function loadCategories() {
    $.getJSON(apiUrl + "categories.php", function (data) {
      $("#content").empty();
      data.categories.forEach((category) => {
        $("#content").append(`
            
            <div class="rounded-lg shadow-md transition-transform group" data-category="${category.strCategory}">
  <div class="relative">
    <img src="${category.strCategoryThumb}" alt="${category.strCategory}" class="w-full object-cover rounded">
    <div class="filter-category rounded-lg shadow-md absolute inset-0 group-hover:bg-black-900 group-hover:text-white transition-colors duration-300 flex items-end p-4" data-category="${category.strCategory}">
      <h2 class="font-bold text-lg group-hover:text-white">${category.strCategory}</h2>
    </div>
  </div>
</div>`);
      });
      $(".filter-category").on("click", function() {
        var category = $(this).data("category");
        loadMealsByCategory(category);
      });
    });
  }

  function loadMealsByCategory(category) {
    $.getJSON(apiUrl + "filter.php?c=" + category, function (data) {
      $("#content").empty();
      if (data.meals) {
        data.meals.forEach((meal) => {
          $("#content").append(`
               <div class="rounded-lg shadow-md transition-transform group" id="meal-${meal.idMeal}">
                <div class="relative">
                  <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full object-cover rounded">
                  <div class="rounded-lg view-details shadow-md absolute inset-0 group-hover:bg-black-900 group-hover:text-white transition-colors duration-300 flex items-end p-4" data-id="${meal.idMeal}">
                    <h2 class="font-bold text-lg group-hover:text-white">${meal.strMeal}</h2>
                  </div>
                </div>
              </div>`);
        });
      } else {
        $("#content").append(
          "<p class='text-red-500'>No meals found in this category.</p>"
        );
      }
    });
  }

  function loadMealDetails(id) {
    $.getJSON(apiUrl + "lookup.php?i=" + id, function (data) {
      const meal = data.meals[0];
      $("#container").html(`
                        <div class=" text-white p-4 rounded-lg shadow-md">
                            <img src="${
                              meal.strMealThumb
                            }" alt="${meal.strMeal}" class="w-full h-sm object-cover rounded">
                            <h2 class="font-bold text-2xl m-4">${
                              meal.strMeal
                            }</h2>
                            <p class="mb-2"><strong>Instructions:</strong> ${
                              meal.strInstructions
                            }</p>
                            <p class="mb-2"><strong>Category:</strong> ${
                              meal.strCategory
                            }</p>
                            <p class="mb-2"><strong>Area:</strong> ${meal.strArea}</p>
                            <p class="mb-2"><strong>Tags:</strong> ${
                              meal.strTags
                            }</p>
                             <button type="button" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-sm">
                                    <a href="${
                              meal.strSource
                            }" target="_blank">Source</a>
      </button>
 <button type="button" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-sm">
                                    <a href="${
                                      meal.strYoutube
                                    }" target="_blank">Youtube</a>
      </button>
                         
                        </div>
                    `);
    });
  }
  function loadIngredients() {
    $.getJSON(apiUrl + "list.php?i=list", function (data) {
        $("#content").empty();
        data.meals.forEach((ingredient) => {
            $("#content").append(`
                <div class="p-4 rounded-lg text-white shadow-md mb-4 cursor-pointer" data-ingredient="${ingredient.strIngredient}">
                    <i class="fas fa-utensils fa-5x"></i>
                    <h2 class="font-bold text-lg">${ingredient.strIngredient}</h2>
                </div>`);
        });

        $(".cursor-pointer").on("click", function() {
            var ingredient = $(this).data("ingredient");
            loadMealsByIngredient(ingredient);
        });
    });
}

function loadMealsByIngredient(ingredient) {
    $.getJSON(apiUrl + "filter.php?i=" + ingredient, function (data) {
        $("#content").empty();
        if (data.meals) {
            data.meals.forEach((meal) => {
                $("#content").append(`
                    <div class="rounded-lg shadow-md transition-transform group">
                        <div class="relative">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full object-cover rounded">
                            <div class="rounded-lg view-details shadow-md absolute inset-0 group-hover:bg-black-900 group-hover:text-white transition-colors duration-300 flex items-end p-4" data-id="${meal.idMeal}">
                                <h2 class="font-bold text-lg group-hover:text-white">${meal.strMeal}</h2>
                            </div>
                        </div>
                    </div>`);
            });
        } else {
            $("#content").append("<p class='text-red-500'>No meals found with this ingredient.</p>");
        }
    });
}


  function loadAreas() {
    $.getJSON(apiUrl + "list.php?a=list", function (data) {
      $("#content").empty();
      data.meals.forEach((area) => {
        $("#content").append(`
            <div class="p-4 rounded-lg text-white shadow-md mb-4 cursor-pointer" data-area="${area.strArea}">
                <i class="fas fa-place-of-worship fa-5x"></i>
                <h2 class="font-bold  text-lg">${area.strArea}</h2>
            </div>`);
      });
      $(".cursor-pointer").on("click", function() {
        var area = $(this).data("area");
        loadMealsByArea(area);
      });
    });
  }
  
  function loadMealsByArea(area) {
    $.getJSON(apiUrl + "filter.php?a=" + area, function (data) {
      $("#content").empty();
      if (data.meals) {
        data.meals.forEach((meal) => {
          $("#content").append(`
               <div class="rounded-lg shadow-md transition-transform group">
                <div class="relative">
                  <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full object-cover rounded">
                  <div class="rounded-lg view-details shadow-md absolute inset-0 group-hover:bg-black-900 group-hover:text-white transition-colors duration-300 flex items-end p-4" data-id="${meal.idMeal}">
                    <h2 class="font-bold text-lg group-hover:text-white">${meal.strMeal}</h2>
                  </div>
                </div>
              </div>`);
        });
      } else {
        $("#content").append(
          "<p class='text-red-500'>No meals found in this area.</p>"
        );
      }
    });
  }

  function loadContactUs() {
    $("#container").html(`
  <div class="flex justify-center items-center h-screen">
    <form id="signup-form" class="bg-gray-800 p-8 rounded-lg w-full max-w-md">
      <h2 class="text-2xl text-white font-bold mb-6">Contact Us</h2>
      <div class="mb-4">
        <input type="text" id="name" placeholder="Enter Your Name" class="bg-gray-700 border border-gray-600 text-white p-2 rounded w-full" required>
      </div>
      <div class="mb-4">
        <input type="email" id="email" placeholder="Enter Your Email" class="bg-gray-700 border border-gray-600 text-white p-2 rounded w-full" required>
      </div>
      <div class="mb-4">
        <input type="tel" id="phone" placeholder="Enter Your Phone" class="bg-gray-700 border border-gray-600 text-white p-2 rounded w-full" required>
      </div>
      <div class="mb-4">
        <input type="number" id="age" placeholder="Enter Your Age" class="bg-gray-700 border border-gray-600 text-white p-2 rounded w-full" required>
      </div>
      <div class="mb-4">
        <input type="password" id="password" placeholder="Enter Your Password" class="bg-gray-700 border border-gray-600 text-white p-2 rounded w-full" required>
      </div>
      <div class="mb-6">
        <input type="password" id="confirm-password" placeholder="Rewrite Password" class="bg-gray-700 border border-gray-600 text-white p-2 rounded w-full" required>
      </div>
     <button type="submit" class="border border-yellow-300 hover:bg-yellow-300 text-yellow-300 hover:text-white font-bold py-2 px-4 rounded w-full transition-colors duration-300">
        Submit
      </button>
    </form>
  </div>
`);
  }
  $(document).ready(function () {
    $("#signup-form").on("submit", function (e) {
      e.preventDefault();
      var name = $("#name").val();
      var email = $("#email").val();
      var phone = $("#phone").val();
      var age = $("#age").val();
      var password = $("#password").val();
      var confirmPassword = $("#confirm-password").val();

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      $.ajax({
        type: "POST",
        url: "submit.php",
        data: {
          name: name,
          email: email,
          phone: phone,
          age: age,
          password: password,
        },
        success: function (response) {
          prompt("Sign up successful!");
        },
        error: function (xhr, status, error) {
          prompt("Error: " + error);
        },
      });
    });
  });

  $("#search-link").click(function () {
    $("#content").empty();

    $("#container").prepend(`
        <div class="flex w-full flex-row bg-white space-x-2 mb-4">
            <input type="text" id="meal-name" placeholder="Search by meal name" class="border border-gray-300 p-2 rounded w-full flex-grow">
            <input type="text" id="meal-letter" placeholder="Search by first letter" class="border border-gray-300 p-2 rounded w-full max-w-[60px]" maxlength="1">
        </div>
    `);

    $("#meal-name").on("input", function () {
      const mealName = $(this).val();
      const mealLetter = $("#meal-letter").val();
      loadMeals(mealName);
    });

    $("#meal-letter").on("input", function () {
      const mealName = $("#meal-name").val();
      const mealLetter = $(this).val();
      loadMeals(mealLetter);
    });
  });

  $("#categories-link").click(function () {
    loadCategories();
  });

  $("#ingredients-link").click(function () {
    loadIngredients();
  });

  $("#areas-link").click(function () {
    loadAreas();
  });

  $("#contact-link").click(function () {
    loadContactUs();
  });

  $(document).on("click", ".filter-category", function () {
    const category = $(this).data("category");
    loadMealsByCategory(category);
  });

  $(document).on("click", ".view-details", function () {
    const mealId = $(this).data("id");
    loadMealDetails(mealId);
  });

  loadMeals();
});
