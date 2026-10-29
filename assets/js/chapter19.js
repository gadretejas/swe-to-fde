(() => {
 'use strict';
 document.getElementById('evaluate19').addEventListener('click', () => {
  const fields = ['good19','minor19','serious19','abstain19'].map(id => document.getElementById(id));
  const output = document.getElementById('result19');
  if (fields.some(e => e.value.trim() === '' || !e.checkValidity() || !Number.isFinite(Number(e.value)))) { output.textContent = 'Enter whole-number counts from 0 to 1,000,000 in every field.'; return; }
  const [good, minor, serious, abstain] = fields.map(e => Number(e.value));
  const answered = good + minor + serious, total = answered + abstain;
  if (!total) { output.textContent = 'Enter at least one case. Rates are undefined for an empty evaluation set.'; return; }
  const pct = (n,d) => `${Number((100*n/d).toFixed(2))}%`;
  output.textContent = `${total} cases; ${answered} answered. Answer coverage: ${pct(answered,total)}. Acceptable-answer yield across all cases: ${pct(good,total)}. Acceptable among answered: ${answered ? pct(good,answered) : 'not applicable (no answered cases)'}. Serious errors across all cases: ${pct(serious,total)}; among answered: ${answered ? pct(serious,answered) : 'not applicable (no answered cases)'}. Review whether abstentions were warranted. These descriptive rates do not establish launch readiness; zero observed serious failures does not mean zero risk.`;
 });
 document.getElementById('review-check19').addEventListener('click', () => {
  const choice = document.querySelector('input[name="review19"]:checked');
  document.getElementById('review-result19').textContent = !choice ? 'Select an answer first.' : choice.value === '1' ? 'Correct. A citation must support the claim. Preserve source inspection, rejection, and failure reporting.' : 'Reconsider: a citation alone does not establish factual support. Reviewers need access to the evidence and a way to reject unsupported claims.';
 });
})();
