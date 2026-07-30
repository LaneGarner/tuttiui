import type { Meta, StoryObj } from "@storybook/react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  Breadcrumbs,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  ConfidenceIndicator,
  Divider,
  Input,
  Label,
  Progress,
  Select,
  Skeleton,
  Switch,
  Textarea,
} from "@tutti-ui/react";

/**
 * Every color-bearing surface on one page. The point is the theme toggle in
 * the toolbar: this story is what the contrast harness screenshots and
 * measures, and it is the fastest way to eyeball whether a token change broke
 * something three components away.
 */
const meta: Meta = {
  title: "Overview/Every Surface",
  parameters: { layout: "fullscreen" },
};
export default meta;

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="flex flex-col gap-3">
    <h2 className="text-sm font-semibold uppercase tracking-wide text-tt-fg-subtle">
      {title}
    </h2>
    {children}
  </section>
);

export const EverySurface: StoryObj = {
  render: () => (
    <div className="min-h-screen bg-tt-canvas p-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <Section title="Text ramp">
          <p className="text-tt-fg" data-probe="fg">Primary text on canvas</p>
          <p className="text-tt-fg-strong" data-probe="fg-strong">Strong text</p>
          <p className="text-tt-fg-muted" data-probe="fg-muted">Muted body text</p>
          <p className="text-tt-fg-subtle" data-probe="fg-subtle">Subtle caption text</p>
          <p className="text-tt-fg-faint" data-probe="fg-faint">Faint placeholder text</p>
        </Section>

        <Section title="Buttons">
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </Section>

        <Section title="Form controls">
          <div className="flex flex-col gap-3">
            <Label htmlFor="probe-input" required>Label</Label>
            <Input id="probe-input" placeholder="Placeholder text" />
            <Input placeholder="Error state" error />
            <Select placeholder="Choose one">
              <option>Build strength</option>
            </Select>
            <Textarea placeholder="Textarea placeholder" />
            <div className="flex items-center gap-3">
              <Checkbox id="probe-check" defaultChecked />
              <Switch defaultChecked aria-label="switch" />
            </div>
          </div>
        </Section>

        <Section title="Cards">
          <Card>
            <CardHeader>
              <CardTitle>Card title</CardTitle>
              <CardDescription>Card description text</CardDescription>
            </CardHeader>
            <CardContent>Card body content.</CardContent>
          </Card>
        </Section>

        <Section title="Alerts">
          <div className="flex flex-col gap-2">
            {(["default", "info", "success", "warning", "error"] as const).map(
              (v) => (
                <Alert key={v} variant={v}>
                  <AlertTitle>{v}</AlertTitle>
                  <AlertDescription>
                    Three weeks without progress. Try a 5% deload on Friday.
                  </AlertDescription>
                </Alert>
              )
            )}
          </div>
        </Section>

        <Section title="Indicators">
          <div className="flex flex-col gap-3">
            <Progress value={70} />
            <Progress value={70} variant="success" />
            <Progress value={70} variant="warning" />
            <Progress value={70} variant="error" />
            <ConfidenceIndicator value={86} label="Confidence" />
            <ConfidenceIndicator value={45} label="Confidence" />
            <ConfidenceIndicator value={12} label="Confidence" />
            <Skeleton className="h-4 w-40" />
          </div>
        </Section>

        <Section title="Misc">
          <div className="flex items-center gap-4">
            <Avatar size="md">
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <Breadcrumbs>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbPage>Current</BreadcrumbPage>
              </BreadcrumbItem>
            </Breadcrumbs>
          </div>
          <Divider />
        </Section>
      </div>
    </div>
  ),
};
