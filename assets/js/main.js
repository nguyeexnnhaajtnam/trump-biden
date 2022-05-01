async function getDataFromServer(Url) {
	let res = await fetch(Url);
	let data = await res.json();
	return data;
}

async function homePage() {
	const data = await getDataFromServer(
		'https://api-election.cbsnews.com/api/public/races2/2020/G?filter.officecode=P'
	);
	const homePageBody = document.querySelector('.president-wrapper');
	let totalTrump0 = 0;
	let totalTrump1 = 0;
	let totalBiden0 = 0;
	let totalBiden1 = 0;
	// *total ev trump
	let totalEvTrump = data.reduce((sum, value) => {
		if (value.candidates[0].fullName === 'Donald Trump') {
			return sum + value.candidates[0].ev;
		}
		return sum;
	}, 1);
	// *total ev biden
	let totalEvBiden = data.reduce((sum, value) => {
		if (value.candidates[0].fullName === 'Joe Biden') {
			return sum + value.candidates[0].ev;
		}
		return sum;
	}, 1);
	// *total votes biden
	let bidenVote0 = data
		.filter((state) => state.rating === 'Dem Win')
		.reduce((sum, value) => sum + value.candidates[0].vote, 0);
	let bidenVote1 = data
		.filter((state) => state.rating === 'Rep Win')
		.reduce((sum, value) => sum + value.candidates[1].vote, 0);

	let bidenTotalVote = bidenVote0 + bidenVote1;
	// *total votes trump
	let trumpVote0 = data
		.filter((state) => state.rating === 'Rep Win')
		.reduce((sum, value) => sum + value.candidates[0].vote, 0);
	let trumpVote1 = data
		.filter((state) => state.rating === 'Dem Win')
		.reduce((sum, value) => sum + value.candidates[1].vote, 0);
	let trumpTotalVote = trumpVote0 + trumpVote1;

	// *TOTAL VOTE
	let totalVote = bidenTotalVote + trumpTotalVote + 15;
	// *Show home page
	data.map((state, index) => {
		// if (state.rating === 'Rep Win') {
		// 	totalTrump0 += state.candidates[0].vote;
		// }
		// if (state.rating === 'Dem Win') {
		// 	totalTrump1 += state.candidates[1].vote;
		// }
		// let totalVoteTrump = totalTrump0 + totalTrump1;

		// *total votes biden
		homePageBody.innerHTML = `
            <div class="text-center">
                        <p class="h1 mt-5">Presidential Result</p>
                    </div>
                    <div
                        class="text-center d-flex justify-content-center"
                        style="gap: 32px"
                    >
                        <p style="color: var(--red-color)">
                            Update: <span class="font-weight-bold">1Y Ago</span>
                        </p>
                        <p>Exil Poll +</p>
                    </div>
                    <div class="d-flex mt-3">
                        <div
                            class="biden d-flex px-5 py-5"
                            style="width: 50%; background-color: var(--blue-color)"
                        >
                            <div
                                class="img d-flex justify-content-center align-items-center"
                                style="width: 50%"
                            >
                                <img src="/assets/img/biden.jfif" alt="" />
                            </div>
                            <div
                                class="info text-white d-flex flex-column align-items-end"
                                style="width: 50%"
                            >
                                <div class="info-name">
                                    Joe Biden (D) <i class="bi bi-check-circle-fill"></i>
                                </div>
                                <p>Electoral College</p>
                                <p class="h1">${totalEvBiden}</p>
                                <p>Votes</p>
                                <div
                                    class="d-flex justify-content-around"
                                    style="gap: 32px"
                                >
                                    <p>${(
																			(bidenTotalVote / totalVote) *
																			100
																		).toFixed(2)}%</p>
                                    <p>${bidenTotalVote.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                        <div
                            class="trump d-flex justify-content-end px-5 py-5"
                            style="width: 50%; background-color: var(--red-color)"
                        >
                            <div class="info text-white" style="width: 50%">
                                <div class="info-name">Donald Trump (R)</div>
                                <p>Electoral College</p>
                                <p class="h1">${totalEvTrump}</p>
                                <p>Votes</p>
                                <div
                                    class="d-flex flex-row-reverse justify-content-end"
                                    style="gap: 32px"
                                >
                                    <p>${(
																			(trumpTotalVote / totalVote) *
																			100
																		).toFixed(2)}%</p>
                                    <p>${trumpTotalVote.toLocaleString()}</p>
                                </div>
                            </div>
                            <div
                                class="img d-flex justify-content-center align-items-center"
                                style="width: 50%"
                            >
                                <img src="/assets/img/trump.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div class="vote-bar" style="background-image: linear-gradient(
		to right,
		var(--blue-color) ${((bidenTotalVote / totalVote) * 100).toFixed(2)}%,
		var(--red-color) ${((trumpTotalVote / totalVote) * 100).toFixed(2)}%"></div>
                    <div class="text-center font-weight-bold mt-2">${
											totalVote - (bidenTotalVote + trumpTotalVote)
										} to Win</div>
`;
	});
}
homePage();
