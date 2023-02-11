<template>
	<section id="main" class="main">
		<header class="border-b border-slate-200 dark:border-slate-400">
			<h1 class="font-black text-lg">
				AI Bio Generator</h1>
		</header>

		<div class="content">
			<div class="mt-5 grid gap-5">
				<label for="name">
					<span class="label-text">Your Name</span>
					<input type="text" placeholder="eg. John Doe" id="name" class="form-input" v-model="nameRef" autofocus="true"
						required />
				</label>
				<label for="desc">
					<span class="label-text !inline">Describe yourself</span>
					<span class="label-text !inline float-right text-sm">30-350 characters</span>
					<textarea type="text" placeholder="Enter a short information about yourself" id="desc" class="form-input"
						minlength="30" rows="2" maxlength="350" v-model="descRef" required />
				</label>
				<label for="keywords">
					<span class="label-text !inline">Keywords</span>
					<span class="label-text !inline float-right text-sm">{{ 6- keywords.length }}/6 left</span>

					<span
						class="mt-2 flex gap-3 flex-wrap rounded-md text-slate-900 outline outline-1 p-2 outline-slate-200 dark:outline-slate-400">
						<span v-for="keyword, index in keywords" :key="index"
							class="bg-indigo-500 dark:bg-indigo-200 bg-opacity-20 min-w-20 text-sm px-4 py-2 rounded-full">
							<span>{{ keyword }}</span>
							<button aria-label="remove keyword"
								class="ml-2 rounded-full text-white dark:text-slate-700 bg-slate-700 dark:bg-slate-100 px-1.5"
								@click.prevent="removeKeyword(index)">-</button>
						</span>

						<input v-if="keywords.length < 6" id="keywords" v-model="keywordRef"
							class="form-input text-slate-700 dark:text-slate-50 !px-3 !py-2 w-auto" placeholder="Enter keyword"
							@keyup.enter="addKeyword" />
					</span>

				</label>

				<label for="platform">
					<span class="label-text">Platform</span>
					<select name="platform" class="form-input" v-model="platformRef" id="platform">
						<option value="Twitter" class="select-option" selected>Twitter</option>
						<option value="LinkedIn" class="select-option">LinkedIn</option>
						<option value="Instagram" class="select-option">Instagram</option>
						<option value="Faceboook" class="select-option">Facebook</option>
					</select>
				</label>

				<header class="mt-2 pb-2 border-b border-slate-200 dark:border-slate-400">
					<h1 class="font-black text-base">
						More Customizations</h1>
				</header>

				<p class="label-text !mb-0">Point of View</p>
				<div class="flex rounded-md gap-4 outline outline-1 p-2 outline-slate-200 dark:outline-slate-400">
					<label for="firstPerson">
						<input type="radio" name="radio" id="firstPerson" value="First Person" v-model="firstPersonPovRef" />
						<span class="ml-2 text-slate-700 dark:text-slate-200">First Person</span>
					</label>
					<label>
						<input type="radio" name="radio" id="secondPerson" v-model="secondPersonPovRef" />
						<span class="ml-2 text-slate-700 dark:text-slate-200">Second Person</span>
					</label>
					<label>
						<input type="radio" name="radio" id="thirdPerson" v-model="thirdPersonPovRef" />
						<span class="ml-2 text-slate-700 dark:text-slate-200">Third Person</span>
					</label>
				</div>

				<label for="vibe">
					<span class="label-text">Vibe</span>
					<select name="vibe" class="form-input" v-model="vibeRef" id="vibe">
						<option value="witty" class="select-option" selected>Witty</option>
						<option value="professional" class="select-option">Professional</option>
						<option value="funny" class="select-option">Funny</option>
						<option value="casual" class="select-option">Casual</option>
					</select>
				</label>
			</div>

			<div class="flex items-center gap-3 mt-5 justify-end lg:mb-2">
				<button
					class="btn border-[#0053EB] text-[#0053EB] bg-[#c9e1ed] hover:opacity-90 dark:border-[#206ebd] dark:text-[#206ebd] dark:bg-[#c9e1ed]"
					@click="resetFields">reset</button>
				<button
					class="btn bg-[#0053EB] border-[#0053EB] hover:opacity-90 text-[#c9e1ed] dark:bg-[#206ebd] dark:border-[#206ebd] dark:text-white"
					@click="generate" :disabled="loading">
					<span :class="loading ? 'hidden' : 'block'">generate</span>

					<!-- Button spinner -->
					<div :class="loading ? 'block' : 'hidden'" aria-label="Loading..." role="status">
						<svg class="h-5 !w-12 animate-spin stroke-white" viewBox="0 0 256 256">
							<line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
							</line>
							<line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
								stroke-width="24">
							</line>
							<line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round"
								stroke-width="24"></line>
							<line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
								stroke-width="24">
							</line>
							<line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round"
								stroke-width="24"></line>
							<line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
								stroke-width="24">
							</line>
							<line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
							</line>
							<line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
								stroke-width="24">
							</line>
						</svg>
					</div>

				</button>
			</div>
		</div>

	</section>
</template>

<script lang="ts" setup>
const { $toast } = useNuxtApp()
const results = useResults()

// state
const keywordRef = ref('')
const keywords = useState<string[]>('keywords', () => [])
const nameRef = ref('')
const descRef = ref('')
const vibeRef = ref('witty')
const platformRef = ref('Twitter')

const firstPersonPovRef = ref(null)
const secondPersonPovRef = ref(null)
const thirdPersonPovRef = ref(null)

const loading = ref(false)

// functions
const generate = async () => {
	if (nameRef.value === '') return $toast.error('Please enter your name')
	if (descRef.value === '') return $toast.error('Please enter description')
	if (keywords.value.length === 0) return $toast.error('You must enter at least one keyword')
	if (firstPersonPovRef.value === null && secondPersonPovRef.value === null && thirdPersonPovRef.value === null) return $toast.error('Please select Point of View')

	loading.value = true;

	let pov;

	if (firstPersonPovRef.value !== null) pov = 'First Person'
	else if (secondPersonPovRef.value !== null) pov = 'Second Person'
	else pov = 'Third Person'

	let generatedBios = await generateBio(nameRef.value, descRef.value, keywords.value, pov, vibeRef.value, platformRef.value);

	results.value = []
	generatedBios?.substring(generatedBios.indexOf("1") + 3)
		.split("2. ").map((bio) => {
			results.value.push(bio)
		})
}

const resetFields = () => {
	keywords.value = []
	keywordRef.value = ""
	nameRef.value = ""
	descRef.value = ""
	vibeRef.value = 'witty'
	platformRef.value = 'Twitter'

	// reset radio buttons
	firstPersonPovRef.value = null
	secondPersonPovRef.value = null
	thirdPersonPovRef.value = null
}

const addKeyword = () => {
	if (keywords.value.includes(keywordRef.value)) $toast.info("Keyword already added")
	else if (keywordRef.value === "") $toast.error("Keyword field cannot be empty")
	else keywords.value.push(keywordRef.value)

	keywordRef.value = ""
}

const removeKeyword = (index: number) => {
	keywords.value = keywords.value.filter((_, i) => i !== index)
}

</script>
