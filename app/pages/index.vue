<script setup lang="ts">
// import { useUserStore } from '../../../stores/user'
import { useUserStore } from '../../stores/user'

const user = useUserStore()
console.log('user: ', user)
</script>

<template>
  <div v-if="!user.isLoggedIn">
    <h1></h1>
    <AuthCreateUserForm />
  </div>
  <div v-if="user.isLoggedIn">
    <SectionsFullWidth>
      <h1>{{ user.name }}'s' Profile Page</h1>
      <Drawer buttonText="Add Player">
        <PlayersProfileForm />
      </Drawer>
      <Drawer buttonText="Add Team">
        <TeamsCreateForm />
      </Drawer>
      <TeamsList />
    </SectionsFullWidth>
    
    
    
  </div>
</template>