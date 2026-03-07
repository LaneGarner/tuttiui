import type { Meta, StoryObj } from "@storybook/react";
import { NavMenu, NavMenuItem, NavMenuLink } from "./NavMenu";

const meta: Meta<typeof NavMenu> = {
  title: "Components/NavMenu",
  component: NavMenu,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NavMenu>;

export const Vertical: Story = {
  render: () => (
    <NavMenu aria-label="Main navigation">
      <NavMenuItem>
        <NavMenuLink href="/dashboard" active>
          Dashboard
        </NavMenuLink>
      </NavMenuItem>
      <NavMenuItem>
        <NavMenuLink href="/projects">Projects</NavMenuLink>
      </NavMenuItem>
      <NavMenuItem>
        <NavMenuLink href="/team">Team</NavMenuLink>
      </NavMenuItem>
      <NavMenuItem>
        <NavMenuLink href="/settings">Settings</NavMenuLink>
      </NavMenuItem>
    </NavMenu>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <NavMenu aria-label="Main navigation" orientation="horizontal">
      <NavMenuItem>
        <NavMenuLink href="/dashboard" active>
          Dashboard
        </NavMenuLink>
      </NavMenuItem>
      <NavMenuItem>
        <NavMenuLink href="/projects">Projects</NavMenuLink>
      </NavMenuItem>
      <NavMenuItem>
        <NavMenuLink href="/team">Team</NavMenuLink>
      </NavMenuItem>
      <NavMenuItem>
        <NavMenuLink href="/settings">Settings</NavMenuLink>
      </NavMenuItem>
    </NavMenu>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <NavMenu aria-label="Main navigation">
      <NavMenuItem>
        <NavMenuLink href="/dashboard" active>
          {"📊 Dashboard"}
        </NavMenuLink>
      </NavMenuItem>
      <NavMenuItem>
        <NavMenuLink href="/projects">{"📁 Projects"}</NavMenuLink>
      </NavMenuItem>
      <NavMenuItem>
        <NavMenuLink href="/team">{"👥 Team"}</NavMenuLink>
      </NavMenuItem>
      <NavMenuItem>
        <NavMenuLink href="/messages">{"💬 Messages"}</NavMenuLink>
      </NavMenuItem>
      <NavMenuItem>
        <NavMenuLink href="/settings">{"⚙️ Settings"}</NavMenuLink>
      </NavMenuItem>
    </NavMenu>
  ),
};
