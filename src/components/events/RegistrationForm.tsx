import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registrationSchema,
  type RegistrationFormData,
} from "@/schemas/registrationSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { useRegisterForEvent } from "@/hooks/useRegistrations";
import { Loader2, CheckCircle2, UserPlus } from "lucide-react";

const DEPARTMENTS = [
  "Computer Science & Engineering",
  "Information Technology",
  "Electronics & Communication",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Biotechnology",
  "Chemical Engineering",
  "Mathematics",
  "Physics",
  "Other",
] as const;

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"] as const;

interface RegistrationFormProps {
  eventId: string;
  isFull: boolean;
}

export default function RegistrationForm({
  eventId,
  isFull,
}: RegistrationFormProps) {
  const [success, setSuccess] = useState(false);
  const registerMutation = useRegisterForEvent();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      registration_number: "",
      name: "",
      email: "",
      section: "",
      department: "",
      year: "",
      phone: "",
    },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      await registerMutation.mutateAsync({
        event_id: eventId,
        registration_number: data.registration_number.toUpperCase(),
        name: data.name,
        email: data.email.toLowerCase(),
        section: data.section || undefined,
        department: data.department,
        year: data.year,
        phone: data.phone || undefined,
      });
      setSuccess(true);
      reset();
    } catch {
      // Error is handled by mutation state
    }
  };

  if (success) {
    return (
    <Card className="border-[hsl(var(--primary))] bg-[hsl(var(--pastel-peach))]/30">
        <CardContent className="p-6 text-center space-y-3">
          <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
          <h3 className="text-lg font-semibold">
            Registration Successful!
          </h3>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            You have been registered for this event. You'll receive a
            confirmation at your email.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSuccess(false)}
            className="mt-2"
          >
            Register Another Person
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base font-semibold font-sans">
          <UserPlus className="h-4 w-4 text-[hsl(var(--primary))]" />
          Register for this Event
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isFull ? (
          <div className="text-center py-4">
            <p className="text-sm font-medium text-[hsl(var(--destructive))]">
              This event is fully booked.
            </p>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
              No more spots available.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="Registration No."
                htmlFor="registration_number"
                required
                error={errors.registration_number?.message}
                hint="e.g. RA2211003010XXX"
              >
                <Input
                  id="registration_number"
                  placeholder="RA..."
                  error={errors.registration_number?.message}
                  {...register("registration_number")}
                />
              </FormField>

              <FormField
                label="Full Name"
                htmlFor="name"
                required
                error={errors.name?.message}
              >
                <Input
                  id="name"
                  placeholder="Your name"
                  error={errors.name?.message}
                  {...register("name")}
                />
              </FormField>
            </div>

            <FormField
              label="Email"
              htmlFor="email"
              required
              error={errors.email?.message}
            >
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register("email")}
              />
            </FormField>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="Department"
                htmlFor="department"
                required
                error={errors.department?.message}
              >
                <Select
                  onValueChange={(v) => setValue("department", v)}
                >
                  <SelectTrigger id="department" className={errors.department ? "border-[hsl(var(--destructive))]" : ""}>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField
                label="Year"
                htmlFor="year"
                required
                error={errors.year?.message}
              >
                <Select onValueChange={(v) => setValue("year", v)}>
                  <SelectTrigger id="year" className={errors.year ? "border-[hsl(var(--destructive))]" : ""}>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {YEARS.map((y) => (
                      <SelectItem key={y} value={y}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="Section"
                htmlFor="section"
                error={errors.section?.message}
                hint="Optional"
              >
                <Input
                  id="section"
                  placeholder="e.g. A, B, C"
                  error={errors.section?.message}
                  {...register("section")}
                />
              </FormField>

              <FormField
                label="Phone"
                htmlFor="phone"
                error={errors.phone?.message}
                hint="Optional"
              >
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  error={errors.phone?.message}
                  {...register("phone")}
                />
              </FormField>
            </div>

            {registerMutation.isError && (
              <div className="rounded-lg bg-[hsl(var(--destructive))]/10 border border-[hsl(var(--destructive))]/20 p-3">
                <p className="text-sm text-[hsl(var(--destructive))]">
                  {registerMutation.error instanceof Error
                    ? registerMutation.error.message
                    : "Registration failed. Please try again."}
                </p>
              </div>
            )}

            <Button
              type="submit"
              disabled={registerMutation.isPending}
              className="w-full"
            >
              {registerMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Register Now
                </>
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
