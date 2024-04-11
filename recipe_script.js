function handleSignIn(event) {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorContainer = document.getElementById('errorContainer');

  errorContainer.innerHTML = '';

  if (username === '' && password === '') {
    errorContainer.innerHTML = 'Both username and password are required!';
  } else if (username === '') {
    errorContainer.innerHTML = 'Username is required!';
  } else if (password === '') {
    errorContainer.innerHTML = 'Password is required!';
  } else {
    $.ajax({
      type: 'POST',
      url: 'Server/login.php',
      data: { username: username, password: password },
      dataType: 'json',
      success: function (response) {
        if (response.success) {
          localStorage.setItem('userRole', response.role);

          window.location.href = 'dashboard.html';

          document.getElementById('username').value = '';
          document.getElementById('password').value = '';
        } else {
          errorContainer.innerHTML = response.message;
        }
      },
      error: function (xhr, textStatus, errorThrown) {
        if (xhr.status === 401) {
          errorContainer.innerHTML = 'Invalid password';
        } else if (xhr.status === 404) {
          errorContainer.innerHTML = 'User not found';
        } else {
          alert('Error: ' + errorThrown);
        }
      },
    });
  }
}

function handleSignUp(event) {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const role = document.getElementById('roleRecipeSeeker').value;

  const errorContainer = document.getElementById('errorContainer');

  errorContainer.innerHTML = '';

  if (!username || !password || !confirmPassword) {
    errorContainer.innerHTML = 'All fields are required.';
    return;
  }

  if (password.length < 6) {
    errorContainer.innerHTML = 'Password must be at least 6 characters.';
    return;
  }

  if (password !== confirmPassword) {
    errorContainer.innerHTML = 'Passwords do not match.';
    return;
  }

  if (!role) {
    errorContainer.innerHTML = 'Select a role.';
    return;
  }

  $.ajax({
    type: 'POST',
    url: 'Server/register.php',
    data: { username: username, password: password, role: role },
    dataType: 'json',
    success: function (response) {
      document.getElementById('username').value = '';
      document.getElementById('password').value = '';
      document.getElementById('confirmPassword').value = '';

      alert(response.message);
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function addRecipe() {
  const recipeNameInput = document.getElementById('recipeName');
  const recipeDescriptionInput = document.getElementById('recipeDescription');
  const recipeImageInput = document.getElementById('recipeImage');
  const recipeCategoryInput = document.getElementById('recipeCategory');
  const recipeLocationInput = document.getElementById('recipeLocation');

  const recipeName = recipeNameInput.value;
  const recipeDescription = recipeDescriptionInput.value;
  const recipeImage = recipeImageInput.files[0];
  const recipeCategory = recipeCategoryInput.value;
  const recipeLocation = recipeLocationInput.value;

  if (
    !recipeName ||
    !recipeDescription ||
    !recipeImage ||
    !recipeCategory ||
    !recipeLocation
  ) {
    const errorContainer = document.getElementById('errorContainer');
    errorContainer.innerHTML = 'All fields are required';
    return;
  }

  const formData = new FormData();
  formData.append('recipeName', recipeName);
  formData.append('recipeDescription', recipeDescription);
  formData.append('recipeCategory', recipeCategory);
  formData.append('recipeLocation', recipeLocation);
  formData.append('recipeImage', recipeImage);

  $.ajax({
    type: 'POST',
    url: 'Server/addRecipe.php',
    data: formData,
    contentType: false,
    processData: false,
    success: function (response) {
      recipeNameInput.value = '';
      recipeDescriptionInput.value = '';
      recipeImageInput.value = '';
      recipeCategoryInput.value = '';
      recipeLocationInput.value = '';
      alert('Recipe added Successfully');
      const errorContainer = document.getElementById('errorContainer');
      errorContainer.innerHTML = '';
    },
    error: function (error) {
      const responseObj = JSON.parse(error.responseText);

      const errorContainer = document.getElementById('errorContainer');

      if (responseObj && responseObj.message) {
        errorContainer.innerHTML = responseObj.message;
      } else {
        errorContainer.innerHTML = 'An error occurred. Please try again.';
      }
      console.log(error);
    },
  });
}

function deleteRecipe(recipeId) {
  if (confirm('Are you sure you want to delete this recipe?')) {
    const deletePromise = new Promise((resolve, reject) => {
      $.ajax({
        type: 'POST',
        url: 'Server/deleteRecipe.php',
        data: { recipeId: recipeId },
        success: resolve,
        error: reject,
      });
    });

    deletePromise
      .then((response) => {
        location.reload(true);
      })
      .catch((error) => {
        console.error('Error during deletion:', error);
      });
  }
}

function handleAdminPanel() {
  window.location.href = 'chefs_panel.html';
}

function logout() {
  window.location.href = 'signin.html';
  localStorage.clear();
}
