<script setup>
function openLink() {
    const phoneNumber = '2348144460695';
    const message = 'I need help from digixcel hub webapp';
    const url = `https://wa.me/${phoneNumber}/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}
</script>
<template>
    <div class="suppport">
        <img src="/icons/support.svg" @click="openLink">
    </div>

    <div class="menu">
        <router-link to="/" class="item" :class="$route.name == 'home' ? 'active' : 'inactive'">
            <div class="icon">
                <img :src="$route.name == 'home' ? 'icons/home.svg' : 'icons/home-1.svg'">
            </div>
            <div class="__text mb-1">
                Home
            </div>
            <div :class="$route.name == 'home' ? 'dash' : ''"></div>
        </router-link>
        <router-link to="/wallet" class="item" :class="$route.name == 'wallet' ? 'active' : 'inactive'">
            <div class="icon">
                <img :src="$route.name == 'wallet' ? 'icons/empty-wallet.svg' : 'icons/empty-wallet-1.svg'">
            </div>
            <div class="__text mb-1">
                My Wallet
            </div>
            <div :class="$route.name == 'wallet' ? 'dash' : ''"></div>
        </router-link>
        <router-link to="/profile" class="item"
            :class="$route.name == 'profile' ? 'active' : 'inactive'">
            <div class="icon">
                <img :src="$route.name == 'profile' ? 'icons/profile.svg' : 'icons/profile-1.svg'">
            </div>
            <div class="__text mb-1">
                Profile
            </div>
            <div :class="$route.name == 'profile' ? 'dash' : ''"></div>
        </router-link>
    </div>
</template>
<style scoped>
* {
    margin: 0;
    padding: 0;
}

.suppport {

    position: fixed;
    bottom: 85px;
    right: 25px;
    /* height: 65px; */
}

.menu {
    position: fixed;
    bottom: 0;
    height: 55px;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    padding: 38px 0px;
    background: white;
    align-items: center;
}

.item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 27px;
    transition: 0.3s ease;
    text-decoration: none;

    font-family: Lato;
    font-size: 16px;
    font-weight: 600;
    line-height: 19.2px;

}

.item.active {
    color: #07163F;
}

.dash {
    width: 22px;
    height: 2px;
    border-radius: 5px;
    background: #07163F;
}

.item.inactive {
    background-color: transparent !important;
    color: #333333;
}

.icon {
    display: inline-block;
    text-align: center;
}
</style>