<script lang="ts">
    import {io } from 'socket.io-client';
    const socket = io();
     socket.on('eventFromServer', (message)=> console.log(`%c ️🛰️`, `background:aqua;color:black`, {message}));
    
</script>

