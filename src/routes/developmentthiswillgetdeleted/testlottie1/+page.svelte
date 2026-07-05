<script>
    import { DotLottieSvelte } from '@lottiefiles/dotlottie-svelte';
</script>

<h1>DotLottieSvelte</h1>
<h2>@lottiefiles/dotlottie-svelte</h2>

<h3>hoverdevice</h3>
<p>{"/asset/penguin/animated/lottie/hoverdevice.json"}</p>
<div>
    <DotLottieSvelte
        src="/asset/penguin/animated/lottie/hoverdevice.json"
        autoplay={true}
        loop={true}
    />
</div>

<style>
    div {
        width: 480px;
        height: 480px;
    }
</style>