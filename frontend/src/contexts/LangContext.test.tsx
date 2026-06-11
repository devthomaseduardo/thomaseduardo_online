import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LangProvider, useLang } from './LangContext';

const TestComponent = () => {
  const { lang, setLang, t } = useLang();
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="hero-title">{t.hero.h1a}</span>
      <button onClick={() => setLang('en')}>Switch to EN</button>
    </div>
  );
};

describe('LangContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should provide default Portuguese translations', () => {
    render(
      <LangProvider>
        <TestComponent />
      </LangProvider>
    );
    expect(screen.getByTestId('lang').textContent).toBe('pt');
    expect(screen.getByTestId('hero-title').textContent).toBe('Transformo gargalos');
  });

  it('should change language and update translations', () => {
    render(<LangProvider><TestComponent /></LangProvider>);
    fireEvent.click(screen.getByText('Switch to EN'));
    expect(screen.getByTestId('lang').textContent).toBe('en');
    expect(screen.getByTestId('hero-title').textContent).toBe('Architecting code');
  });
});