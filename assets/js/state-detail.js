async function getDataFromServer(Url) {
	let res = await fetch(Url);
	let data = await res.json();
	return data;
}

async function stateDetailPage() {
	const data = await getDataFromServer(
		'https://api-election.cbsnews.com/api/public/races2/2020/G?filter.officecode=P'
	);
	const stateDetailBody = document.querySelector('.detail-container');
	let year = new Date().getFullYear();

	data.map((state, index) => {
		stateDetailBody.innerHTML += `
            <div class="states-detail-page text-dark p-4">
                <div class="state-name">
                    <p class="h4 font-weight-bold">${state.stateName}</p>
                </div>
                <div class="state-vote-detail d-flex">
                    <p class="font-weight-normal" style="color: var(--red-color)">
                        Update: ${year - state.lastUpdated.slice(0, 4) * 1}Y Ago
                    </p>
                    <p class="font-weight-normal">${state.pctIn}% In</p>
                </div>
                <div class="d-flex flex-column${
									state.rating === 'Rep Win' ? '-reverse' : ''
								}">
                    <div class="vote-biden ${
											state.rating === 'Dem Win' ? '' : 'bg-light text-dark'
										} d-flex justify-content-between p-2">
                        <p>Biden (D)</p>
                        <p>${
													state.rating === 'Dem Win'
														? state.candidates[0].vote.toLocaleString()
														: state.candidates[1].vote.toLocaleString()
												}</p>
                        <p>${
													state.rating === 'Dem Win'
														? state.candidates[0].votePct
														: state.candidates[1].votePct
												}%</p>
                    </div>
                    <div class="vote-trump ${
											state.rating === 'Rep Win' ? '' : 'bg-light text-dark'
										} d-flex justify-content-between p-2">
                        <p>Trump (R)</p>
                        <p>${
													state.rating === 'Rep Win'
														? state.candidates[0].vote.toLocaleString()
														: state.candidates[1].vote.toLocaleString()
												}</p>
                        <p>${
													state.rating === 'Rep Win'
														? state.candidates[0].votePct
														: state.candidates[1].votePct
												}%</p>
                    </div>
                </div>
                <div class="d-flex" style="gap: 24px; margin-top: 4px">
                    <p>State Results +</p>
                    <p>Country Results +</p>
                    <p>Exit Poll +</p>
                </div>
            </div>
        `;
	});
}
stateDetailPage();
