<template>
  <div style="position: relative; top:7rem;">
    <type-writer-effect :textStyle="textStyle" text="WELCOME TO THE BLOCKCHAIN BASED VOTING SYSTEM" />
    <!-- Candidates -->
    <b-row align-h="center">
      <b-col cols="10">
        <b-card-group deck>
          <template v-for="candidate in candidates">
            <b-card :title="candidate.name" :img-src="getCandidateImage(candidate.name)" class="text-center"
              img-alt="Image" img-height="90%" img-top>
              <template #footer>
                <input v-show="!secondButtonProps.isVotingResultsVisible" type="radio" v-model="selectedCandidateName"
                  :value="candidate.name" />
                <div v-show="secondButtonProps.isVotingResultsVisible">
                  <p> {{ candidate.numberOfVotes }} Votes </p>
                  <b-progress class="mt-3 mb-3" height="1rem" show-progress animated>
                    <b-progress-bar :value="candidate.numberOfVotes" :label="getProgressBarLabel(candidate.numberOfVotes)"
                      :max="100"></b-progress-bar>
                  </b-progress>
                </div>
              </template>
            </b-card>
          </template>
        </b-card-group>
      </b-col>
    </b-row>

    <b-row class="mt-4" align-h="center" align-v="center">
      <!-- TC Kimlik No Input -->
      <b-col cols="4" v-show="!secondButtonProps.isVotingResultsVisible">
        <b-form-group id="fieldset-1" label="TC Kimlik No: " label-for="input-1">
          <b-form-input id="input-1" v-model="voterId" type="number" />
        </b-form-group>
      </b-col>

      <b-col cols="4" :class="[secondButtonProps.isVotingResultsVisible ? 'text-center mt-3' : 'text-left mt-3']">
        <!-- Cast Vote Button -->
        <b-button v-show="!secondButtonProps.isVotingResultsVisible" @click="handleCastVoteClick"
          variant="outline-primary">
          Cast Vote
        </b-button>

        <!-- Second Button -->
        <b-button @click="handleSecondButtonClick" variant="outline-primary ml-3">
          {{ secondButtonProps.content }}
        </b-button>
      </b-col>
    </b-row>
    <div class="text-center mt-4">
      <hr class="hr-style" />
      <p class="mb-0 text-muted bold">Copyright © {{ currentYear }} Semih Ataman & Recep Tayyip Erdogan. All rights
        reserved.</p>
    </div>
  </div>
</template>

<script>
import TypeWriterEffect from "../components/TypeWriterEffect";
import { castVote, getVotingResults } from "../service/voting.service";

export default {
  components: {
    "type-writer-effect": TypeWriterEffect,
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      voterId: null,
      selectedCandidateName: null,
      totalNumberOfVotes: 0,
      secondButtonProps: {
        isVotingResultsVisible: false,
        content: 'See Voting Results',
      },
      candidates: [
        {
          name: 'Candidate1',
          numberOfVotes: 0,
        },
        {
          name: 'Candidate2',
          numberOfVotes: 0,
        },
        {
          name: 'Candidate3',
          numberOfVotes: 0,
        },
        {
          name: 'Candidate4',
          numberOfVotes: 0,
        },
      ],
    };
  },
  methods: {
    async handleCastVoteClick() {
      if (this.selectedCandidateName === null) {
        alert("Error: Please select a candidate!");
        return;
      }

      if (this.voterId === null) {
        alert("Error: Please enter your TC Kimlik No!");
        return;
      }

      const request = `?voterId=${this.voterId}&candidate=${this.selectedCandidateName}`;
      const response = await castVote(request);

      alert(response);
    },
    async handleSecondButtonClick() {
      this.secondButtonProps.isVotingResultsVisible = !this.secondButtonProps.isVotingResultsVisible;

      if (this.secondButtonProps.isVotingResultsVisible) {
        this.secondButtonProps.content = 'Back to Voting';

        const response = await getVotingResults();
        this.updateCandidateVotes(response);
        this.updateTotalNumberOfVotes(response);
      } else {
        this.secondButtonProps.content = 'See Voting Results';
      }
    },
    updateCandidateVotes(response) {
      for (const key in response) {
        const candidateIndex = this.candidates.findIndex((candidate) => candidate.name === key);
        this.candidates[candidateIndex].numberOfVotes = response[key];
      }
    },
    updateTotalNumberOfVotes(response) {
      this.totalNumberOfVotes = 0;
      for (const key in response) {
        this.totalNumberOfVotes += response[key];
      }
    },
    getProgressBarLabel(numberOfVotes) {
      return `${((numberOfVotes / this.totalNumberOfVotes) * 100).toFixed(3)}%`;
    },
    getCandidateImage(candidateName) {
      return require(`../assets/pictures/${candidateName}.png`);
    }
  },
  computed: {
    textStyle() {
      return {
        marginBottom: "2rem",
        color: "red",
      };
    },
  },
  watch: {
  },
  mounted() {

  },
  beforeDestroy() {

  }
};
</script>

<style scoped>
.hr-style {
  border-top: 1px solid;
}
</style>

