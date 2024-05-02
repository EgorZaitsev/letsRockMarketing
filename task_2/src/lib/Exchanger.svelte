<script lang="ts">
  import { onMount } from "svelte";
  
  let amount1: number = 0;
  let amount2: number = 0;
  let currency1: string = "USD";
  let currency2: string = "EUR";
  let rates: Record<string, number> = {};

  onMount(async () => {
     const response = await fetch(`https://v6.exchangerate-api.com/v6/6332ad937e17566df944ca0a/latest/USD`);
     const data = await response.json();
     rates = data.conversion_rates as Record<string, number>;
  });
  function convert1to2(): void {
      amount2 = round(amount1 * (rates[currency2] / rates[currency1]));
   }

   function convert2to1(): void {
      amount1 = round(amount2 * (rates[currency1] / rates[currency2]));
   }

   function round(num: number): number {
      return Math.round(num * 100) / 100;
   }

   function swapCurrencies(): void {
      [currency1, currency2] = [currency2, currency1];
      convert1to2(); 
   }

   
</script>



<main class="converter">
  <h1>Currency Converter</h1>

  <label for="currency1">Currency 1:</label>
  <select bind:value={currency1} on:change={convert1to2}>
     {#each Object.keys(rates) as key}
        <option value={key}>{key}</option>
     {/each}
  </select>

  <input type="number" bind:value={amount1} on:input={convert1to2} />

  <button class="swap-btn" on:click={swapCurrencies}>Swap</button>

  <label for="currency2">Currency 2:</label>
  <select bind:value={currency2} on:change={convert1to2}>
     {#each Object.keys(rates) as key}
        <option value={key}>{key}</option>
     {/each}
  </select>

  <input type="number" bind:value={amount2} on:input={convert2to1} />
</main>

<footer>
  &copy; SberMarketing Currency Converter
</footer>


  <style>
    * {
       font-family: Arial, sans-serif;
       box-sizing: border-box;

    }
  
    .converter {
      display: flex;
      flex-direction: column;
       background-color: #fff;
       border-radius: 10px;
       box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
       padding: 20px;
       max-width: 600px;
       margin: 50px auto;
    }
  
    .converter h1 {
       font-size: 1.5em;
       color: #333;
       text-align: center;
    }
  
    select, input[type="number"] {
       width: 100%;
       padding: 10px;
       margin: 10px 0;
       border: 1px solid #ccc;
       border-radius: 5px;
    }
  
    button {
       color: white;
       padding: 10px 20px;
       border: none;
       border-radius: 5px;
       cursor: pointer;
    }
  
    .swap-btn {
      align-self: center;
       background-color: #007bff;
    }
  
    .swap-btn:hover {
       background-color: #0056b3;
    }
  
    footer {
       text-align: center;
       padding: 10px;
       font-size: 0.9em;
       color: #666;
    }
  </style>