<script>
    import { LottieSVG } from "PenguinMod-SvelteUI";
</script>

<h1>LottieSVG</h1>

<h3>hoverdevice</h3>
<p>
    <span><b>{"/asset/penguin/animated/lottie/hoverdevice.json"}</b></span>
    <span>vs.</span>
    <span><b>{"/asset/penguin/animated/svg/hoverdevice.svg"}</b></span>
</p>
<div class="row">
    <div class="card">
        <LottieSVG
            src="/asset/penguin/animated/lottie/hoverdevice.json"
        />
    </div>
    <div class="card">
        <img
            src="/asset/penguin/animated/svg/hoverdevice.svg"
            alt="Penguin"
        />
    </div>
</div>

<style>
    .row {
        width: 100%;
        height: 480px;

        display: flex;
        flex-direction: row;
    }
    .card {
        width: 480px;
        height: 480px;
    }

    img {
        width: 100%;
        height: 100%;
        
        object-fit: contain;
    }
</style>