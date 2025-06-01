<script lang="ts">
	import { browser } from "$app/environment";

    if(browser){
        const ws = new WebSocket('ws://localhost:5173/dashboard');
        ws.addEventListener('open', ()=> ws.send('Hello world 📡'))
    }
</script>

