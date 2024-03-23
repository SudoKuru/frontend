import { Locator, Page, expect } from "@playwright/test";

export class ContactPage {
  readonly page: Page;
  readonly title: Locator;
  readonly submitFeedback: Locator;
  readonly feedback: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByText("Contact Us");
    this.submitFeedback = page.getByTestId("SubmitFeedbackButton");
    this.feedback = page.getByTestId("FeedbackTextInput");
  }

  async contactPageIsRendered() {
    await expect(this.title).toBeInViewport({ ratio: 1 });
  }

  async submitFeedbackButtonIsDisabled() {
    await expect(this.submitFeedback).toBeDisabled();
  }

  async submitFeedbackButtonIsEnabled() {
    await expect(this.submitFeedback).toBeEnabled();
  }

  async inputCounterIsX(x: number) {
    await expect(this.page.getByText(`${x}/1000`).last()).toBeInViewport({
      ratio: 1,
    });
  }

  async inputCounterIsZero() {
    await this.inputCounterIsX(0);
  }

  async buttonIsSubmitting() {
    await expect(this.page.getByText("Submitting...")).toBeInViewport({
      ratio: 1,
    });
  }
}
