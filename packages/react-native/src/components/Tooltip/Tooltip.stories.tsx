import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { Button } from "../Button";
import { Tooltip, TooltipTrigger, TooltipContent } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "React Native/Tooltip",
  component: Tooltip,
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <View className="items-center justify-center p-16">
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline">Long press me</Button>
        </TooltipTrigger>
        <TooltipContent>Shows after a long press</TooltipContent>
      </Tooltip>
    </View>
  ),
};

export const BottomSide: Story = {
  render: () => (
    <View className="items-center justify-center p-16">
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline">Long press me</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Appears below the trigger</TooltipContent>
      </Tooltip>
    </View>
  ),
};

export const LongerDuration: Story = {
  render: () => (
    <View className="items-center justify-center p-16">
      <Tooltip duration={4000}>
        <TooltipTrigger>
          <Button variant="outline">Long press me</Button>
        </TooltipTrigger>
        <TooltipContent>Stays visible for 4 seconds</TooltipContent>
      </Tooltip>
    </View>
  ),
};
