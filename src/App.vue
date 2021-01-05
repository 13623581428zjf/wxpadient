<template>
	<div id="app">
		<router-view/>
		<loading v-if='this.$store.state.isShow'></loading>
	</div>
</template>

<script>
	import loading from '@/components/common/loading'
	
	export default {
		name: 'App',
		components:{
			loading
		}
	}
</script>

<style>
	html,
	body {
		height: 100%;
	}
	
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		height: 100%;
	}
</style>
