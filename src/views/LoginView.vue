<template>
  <div class="login-view">
    <!-- Background Image -->
    <div class="background-image" :style="{ backgroundImage: 'url(/assets/login.png)' }"></div>

    <!-- Login/Signup Container -->
    <div class="auth-container">
      <!-- Toggle between Login and Signup -->
      <div class="auth-toggle">
        <button :class="{ active: isLogin }" @click="toggleAuth('login')">Sign In</button>
        <button :class="{ active: !isLogin }" @click="toggleAuth('signup')">Sign Up</button>
      </div>

      <!-- Login Form -->
      <form v-if="isLogin" @submit.prevent="handleLogin" class="auth-form">
        <h2>Sign in with Email</h2>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="loginEmail" placeholder="Enter your email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="loginPassword" placeholder="Enter your password" required />
        </div>
        <div class="form-options">
          <label>
            <input type="checkbox" v-model="keepLoggedIn" /> Keep me logged in
          </label>
          <a href="#" @click.prevent="forgotPassword">Forgot password?</a>
        </div>
        <button type="submit" class="auth-button">Sign In</button>
        <p class="auth-switch">
          Don't have an account? <a href="#" @click.prevent="toggleAuth('signup')">Sign up</a>
        </p>
      </form>

      <!-- Signup Form -->
      <form v-else @submit.prevent="handleSignup" class="auth-form">
        <h2>Create an Account</h2>
        <div class="form-group">
          <label for="signup-email">Email</label>
          <input type="email" id="signup-email" v-model="signupEmail" placeholder="Enter your email" required />
        </div>
        <div class="form-group">
          <label for="signup-password">Password</label>
          <input type="password" id="signup-password" v-model="signupPassword" placeholder="Enter your password" required />
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" v-model="confirmPassword" placeholder="Confirm your password" required />
        </div>
        <button type="submit" class="auth-button">Sign Up</button>
        <p class="auth-switch">
          Already have an account? <a href="#" @click.prevent="toggleAuth('login')">Sign in</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../firebase';

export default {
  name: 'LoginView',
  data() {
    return {
      isLogin: true, // Toggle between login and signup
      loginEmail: '',
      loginPassword: '',
      keepLoggedIn: false,
      signupEmail: '',
      signupPassword: '',
      confirmPassword: '',
    };
  },
  methods: {
    toggleAuth(type) {
      this.isLogin = type === 'login';
    },
    async handleLogin() {
      if (!this.loginEmail || !this.loginPassword) {
        alert('Please enter both email and password.');
        return;
      }
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.loginEmail, this.loginPassword);
        console.log('Logged in:', userCredential.user);
        this.$router.push('/');
      } catch (error) {
        let errorMessage = 'Login failed. Please try again.';
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address.';
            break;
          case 'auth/user-not-found':
            errorMessage = 'User not found. Please sign up.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Incorrect password.';
            break;
        }
        alert(errorMessage);
      }
    },
    async handleSignup() {
      if (!this.signupEmail || !this.signupPassword || !this.confirmPassword) {
        alert('Please fill in all fields.');
        return;
      }
      if (this.signupPassword !== this.confirmPassword) {
        alert('Passwords do not match.');
        return;
      }
      if (this.signupPassword.length < 6) {
        alert('Password must be at least 6 characters.');
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.signupEmail, this.signupPassword);
        console.log('Signed up:', userCredential.user);
        this.$router.push('/');
      } catch (error) {
        let errorMessage = 'Signup failed. Please try again.';
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'Email already in use.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address.';
            break;
          case 'auth/weak-password':
            errorMessage = 'Password must be at least 6 characters.';
            break;
        }
        alert(errorMessage);
      }
    },
    forgotPassword() {
      // Handle forgot password logic
      console.log('Forgot password clicked');
    },
  },
};
</script>

<style scoped>
.login-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1D1D1D;
  position: relative;
  overflow: hidden; /* Prevent scrolling */
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0.2;
  z-index: 1; /* Ensure it's above other elements */
}

.auth-container {
  background-color: #171717;
  padding: 4rem;
  border-radius: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  z-index: 2; /* Ensure it's above the background image */
  width: 100%;
  max-width: 500px;
  position: relative; /* Ensure it's positioned correctly */
}

.auth-toggle {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.auth-toggle button {
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: color 0.3s ease;
}

.auth-toggle button.active {
  color: #4FD1C5;
  border-bottom: 2px solid #4FD1C5;
}

.auth-form h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #4FD1C5;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  background-color: #1D1D1D;
  color: #ffffff;
  font-size: 1rem;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.form-options label {
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-options a {
  color: #4FD1C5;
  text-decoration: none;
  transition: color 0.3s ease;
}

.form-options a:hover {
  color: #38B2AC;
}

.auth-button {
  width: 100%;
  padding: 1rem;
  background-color: #4FD1C5;
  color: #1D1D1D;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.auth-button:hover {
  background-color: #38B2AC;
}

.auth-switch {
  text-align: center;
  margin-top: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
}

.auth-switch a {
  color: #4FD1C5;
  text-decoration: none;
  transition: color 0.3s ease;
}

.auth-switch a:hover {
  color: #38B2AC;
}
</style>
